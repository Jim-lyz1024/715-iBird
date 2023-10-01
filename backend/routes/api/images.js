const express = require('express');
const { Trip, Image, User, Bird } = require("../../db/schema");
const { verifyToken } = require("../../middleware/auth.js");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const { selectRandomQuestions } = require('./utility.js');

const {
    NEW_BIRD_REWARD_COEFFECIENT,
    REPEAT_BIRD_REWARD_COEFFECIENT,
    BIRD_GOAL_COEFFECIENT,
} = require('../../gameConstants');

AWS.config.update({
    accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
    secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
    region: process.env.AMAZON_REGION
});
const s3 = new AWS.S3();


const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AMAZON_BUCKET_NAME,
        acl: 'private', // Set ACL to private
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            // Generate a unique file key using time for now and UUID
            const uniqueFileKey = Date.now().toString() + '-' + uuidv4();
            cb(null, uniqueFileKey);
        }
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Not an image! Please upload an image.', false));
        }
    }
});

router.post('/upload', verifyToken, upload.single('photo'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    try {
        // Check if the user has an active trip
        const activeTrip = await Trip.findOne({ userId: req.user._id, isActive: true });

        if (!activeTrip) {
            return res.status(400).send('No active trip found. Please start a trip before uploading photos.');
        }

        if (!activeTrip.isEdugaming) {
            return res.status(403).send('EduGaming is not enabled for this trip. Cannot upload bird images.');
        }

        if (activeTrip.quiz) {
            return res.status(400).send('You have Quiz to do!');
        }

        // Get the location and timestamp from the request
        const location = req.body.location ? JSON.parse(req.body.location) : null;
        const timestamp = req.body.timestamp || new Date();

        // Identify the bird using AI (for now, randomly select a bird with rarity between 1 and 4)
        const birdCountWithRarity1to4 = await Bird.countDocuments({ rarity: { $lte: 4 } });
        const randomBird = await Bird.findOne({ rarity: { $lte: 4 } }).skip(Math.floor(Math.random() * birdCountWithRarity1to4));

        // Randomly select questions for the quiz based on the bird's rarity
        const selectedQuestions = selectRandomQuestions(randomBird);

        // Set the quiz field of the active trip
        activeTrip.quiz = {
            birdName: randomBird.name,
            birdRarity: randomBird.rarity,
            questions: selectedQuestions
        };

        // Increase the bird count for the count-based goal and check if it matches the target
        const lastBirdCountGoal = activeTrip.birdCountGoals[activeTrip.birdCountGoals.length - 1];
        if (lastBirdCountGoal) {
            lastBirdCountGoal.birdsFound++;
            if (lastBirdCountGoal.birdsFound >= lastBirdCountGoal.level) {
                lastBirdCountGoal.status = 'success';
                const newLevel = Math.min(lastBirdCountGoal.level + 1, 5);  // increment level, max 5
                const newCountGoal = {
                    count: newLevel,
                    level: newLevel
                };
                activeTrip.birdCountGoals.push(newCountGoal);
                activeTrip.scores += BIRD_GOAL_COEFFECIENT * lastBirdCountGoal.level;
            }
        }

        await activeTrip.save();

        // create image
        const newImage = new Image({
            s3Key: req.file.key,
            userId: req.user._id,
            location: location,
            timestamp: timestamp,
            birdId: randomBird._id
        });

        await newImage.save();

        // Update the trip's images array by pushing the new image's ObjectId
        activeTrip.images.push(newImage._id);
        activeTrip.lastTimeFoundBird = timestamp;

        // Check if the identified bird is already in the user's myBirds array
        const user = await User.findById(req.user._id);
        if (!user.myBirds.includes(randomBird._id)) {
            user.myBirds.push(randomBird._id);
            activeTrip.scores += NEW_BIRD_REWARD_COEFFECIENT * randomBird.rarity;
            await user.save();
        } else {
            activeTrip.scores += REPEAT_BIRD_REWARD_COEFFECIENT * randomBird.rarity;
        }

        await activeTrip.save();
        res.status(201).send('Image uploaded successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading image');
    }
});

// Endpoint to get an image by key
router.get('/getImage/*', verifyToken, async (req, res) => {
    try {
        const key = req.params[0];  // This captures everything after '/getImage/'
        const image = await Image.findOne({ s3Key: key });

        if (!image) {
            return res.status(404).send('Image not found or you do not have permission to view it.');
        }

        const user = await User.findById(req.user._id);
        if (image.userId.toString() !== req.user._id.toString() && !user.isExpert) {
            return res.status(404).send('You do not have permission to view it.');
        }

        // If the key contains "/", construct the public URL directly
        if (key.includes("/")) {
            const amazonBucketName = process.env.AMAZON_BUCKET_NAME;
            const amazonRegion = process.env.AMAZON_REGION;
            const baseURL = `https://${amazonBucketName}.s3.${amazonRegion}.amazonaws.com/`;
            const publicURL = baseURL + key;
            return res.status(200).send(publicURL);
        }

        // Generate a pre-signed URL for the image
        const url = s3.getSignedUrl('getObject', {
            Bucket: process.env.AMAZON_BUCKET_NAME,
            Key: image.s3Key,
            Expires: 60 * 30 //30 minutes access to the image
        });

        res.status(200).send(url);
    } catch (error) {
        res.status(500).send('Error retrieving image');
    }
});

router.post('/requestExpertOpinion', verifyToken, async (req, res) => {
    try {
        const { imageId } = req.body;

        // Find the image by its ID
        const image = await Image.findById(imageId);

        if (!image) {
            return res.status(404).send('Image not found.');
        }

        // Check if the user owns the image
        if (image.userId.toString() !== req.user._id.toString()) {
            return res.status(403).send('You do not have permission to update this image.');
        }

        // Update the image's expertStatus
        image.expertStatus = 'inProgress';
        await image.save();

        res.status(200).send('Expert opinion requested successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error requesting expert opinion');
    }
});

router.get('/imagesForExpertReview', verifyToken, async (req, res) => {
    try {
        // Check if the user is an expert
        const user = await User.findById(req.user._id);
        if (!user.isExpert) {
            return res.status(403).send('Access denied. Only experts can view these images.');
        }

        // Retrieve images with expertStatus="inProgress" or "done"
        const images = await Image.find({
            expertStatus: { $in: ["inProgress", "done"] }
        })
            .populate('userId', 'username')  // Populate the username of the user
            .populate('birdId', 'name');     // Populate the name of the bird

        res.status(200).json(images);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving images for expert review');
    }
});

router.post('/updateBirdForImage', verifyToken, async (req, res) => {
    try {
        const { imageId, selectedBirdId } = req.body;

        // Check if the user is an expert
        const user = await User.findById(req.user._id);
        if (!user.isExpert) {
            return res.status(403).send('Access denied. Only experts can update these images.');
        }

        // Find the image by its ID
        const image = await Image.findById(imageId);

        if (!image) {
            return res.status(404).send('Image not found.');
        }

        // Update the birdId of the image
        image.birdId = selectedBirdId || null;  // If selectedBirdId is undefined, set to null

        // Update the expertStatus to "done"
        image.expertStatus = 'done';

        await image.save();

        res.status(200).send('Bird updated successfully for the image');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating bird for the image');
    }
});


module.exports = router;
