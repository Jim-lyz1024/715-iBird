const express = require('express');
const mongoose = require('mongoose');
const { User, Trip, Bird, Image } = require("../../db/schema");
const { verifyToken } = require("../../middleware/auth.js");
const router = express.Router();
const { Client } = require("@googlemaps/google-maps-services-js");
const axios = require('axios');
const {
    QUIZ_FULL_MARKS_REWARD_COEFFICIENT,
    QUIZ_CORRECT_QUESTION_REWARD_COEFFICIENT,
    DISTANCE_COEFFECIENT,
    ELEVATION_GAIN_COEFFECIENT,
    EXERCISE_GOAL_COEFFECIENT,
    BIRD_FLOW_DURATION,
    RARITY_1_PROB,
    RARITY_2_PROB,
    RARITY_3_PROB,
    RARITY_4_PROB,
    RARITY_5_PROB,
    RARITY_6_PROB,
    NEW_BIRD_REWARD_COEFFECIENT,
    REPEAT_BIRD_REWARD_COEFFECIENT,
    BIRD_GOAL_COEFFECIENT,
    FITNESS_ASSESSMENT_TIME,
    BRONZE_CHALLANGE,
    SILVER_CHALLANGE,
    GOLD_CHALLANGE,

    BIRD_COLLECTION_CHALLANGES_BRONZE,
    BIRD_COLLECTION_CHALLANGES_SILVER,
    BIRD_COLLECTION_CHALLANGES_GOLD,

    CORRECT_QUIZZES_CHALLANGES_BRONZE,
    CORRECT_QUIZZES_CHALLANGES_SILVER,
    BCORRECT_QUIZZES_CHALLANGES_GOLD,

    WALKING_DISTANCE_CHALLANGES_BRONZE,
    WALKING_DISTANCE_CHALLANGES_SILVER,
    WALKING_DISTANCE_CHALLANGES_GOLD,

    ELEVATION_GAIN_CHALLANGES_BRONZE,
    ELEVATION_GAIN_CHALLANGES_SILVER,
    ELEVATION_GAIN_CHALLANGES_GOLD,
} = require('../../gameConstants');

const { selectRandomQuestions } = require('./utility')

const {
    LEVEL_1_DISTANCE_GOAL,
    LEVEL_2_DISTANCE_GOAL,
    LEVEL_3_DISTANCE_GOAL,
    LEVEL_4_DISTANCE_GOAL,
    LEVEL_5_DISTANCE_GOAL,
    LEVEL_6_DISTANCE_GOAL,
    LEVEL_7_DISTANCE_GOAL,
    LEVEL_8_DISTANCE_GOAL } = require('../../goals_setting/fitnessGoal');

const client = new Client({});
const {uploadingTrips} = require('../sharedState');

router.post("/startNewTrip", verifyToken, async (req, res) => {
    const userId = req.user._id;

    const trip = await Trip.findOne({ userId, isActive: true });
    if (trip) return res.status(400).send("You can only have one active trip").populate('images');

    // Check for required fields
    if (typeof req.body.isEdugaming !== 'boolean' || !req.body.level) {
        return res.status(400).send("Both isEdugaming and level are required");
    }

    let distanceGoal;
    switch (req.body.level) {
        case '1000 meters':
            distanceGoal = LEVEL_1_DISTANCE_GOAL;
            break;
        case '2000 meters':
            distanceGoal = LEVEL_2_DISTANCE_GOAL;
            break;
        case '3000 meters':
            distanceGoal = LEVEL_3_DISTANCE_GOAL;
            break;
        case '4000 meters':
            distanceGoal = LEVEL_4_DISTANCE_GOAL;
            break;
        case '5000 meters':
            distanceGoal = LEVEL_5_DISTANCE_GOAL;
            break;
        case '6000 meters':
            distanceGoal = LEVEL_6_DISTANCE_GOAL;
            break;
        case '7000 meters':
            distanceGoal = LEVEL_7_DISTANCE_GOAL;
            break;
        case '8000 meters':
            distanceGoal = LEVEL_8_DISTANCE_GOAL;
            break;
        default:
            return res.status(400).send("Invalid fitness level provided");
    }

    let newTrip;

    if (req.body.isEdugaming) {
        // get a random bird with rarity = level
        const randomBirdArrays = await Bird.aggregate([
            { $match: { rarity: 1 } },
            { $sample: { size: 1 } }
        ]).exec();
        const bird = randomBirdArrays[0];

        if (!bird) return res.status(500).send("Could not find a suitable bird");

        const birdCountGoal = {
            count: 1, // For level 1, user needs to find 1 birds
            level: 1,
            birdsFound: 0
        };

        newTrip = await Trip.create({
            userId: userId,
            isEdugaming: req.body.isEdugaming,
            level: distanceGoal.level,
            distanceGoal: distanceGoal,
            birdCountGoals: [birdCountGoal]
        });
    } else {
        newTrip = await Trip.create({
            userId: userId,
            isEdugaming: req.body.isEdugaming,
            level: distanceGoal.level,
            distanceGoal: distanceGoal
        });
    }
    return res.status(201).json(newTrip);
});

router.post("/addLocation", verifyToken, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    const userId = req.user._id;
    const { latitude, longitude, timestamp } = req.body;
    let goalModified = false;

    const trip = await Trip.findOne({ userId, isActive: true });

    if (!trip) {
        await session.commitTransaction();
        session.endSession();
        return res.status(400).send("No active trip found.");
    }

    // uploading photo, do not process add location
    if (uploadingTrips[trip._id]) {
        return res.status(200).json(trip);
    }
    if (trip.locations.length > 0) {
        const lastLocation = trip.locations[trip.locations.length - 1];

        // If the new location matches the last location, skip it.
        if (latitude === lastLocation.latitude && longitude === lastLocation.longitude) {
            await session.commitTransaction();
            session.endSession();
            return res.status(200).json(trip);
        }

        try {
            // API call to compute distance
            const response = await client.distancematrix({
                params: {
                    origins: [{ lat: lastLocation.latitude, lng: lastLocation.longitude }],
                    destinations: [{ lat: latitude, lng: longitude }],
                    key: process.env.GOOGLE_MAPS_API_KEY
                }
            });

            // This value is in meters
            const originDistance = trip.distance;
            const distanceGoogle = Math.round(response.data.rows[0].elements[0].distance.value);
            const distanceHav = Math.round(haversineDistance(lastLocation.latitude, lastLocation.longitude, latitude, longitude));

            const lastTime = new Date(lastLocation.timestamp).getTime();
            const thisTime = new Date(timestamp).getTime();
            const timeDifferenceSeconds = (thisTime - lastTime) / 1000; // Convert difference from milliseconds to seconds
            const estimatedDistance = Math.round(2.5 * timeDifferenceSeconds);

            const distance = Math.min(distanceGoogle, distanceHav, estimatedDistance);
            trip.distance += distance;
            trip.scores += DISTANCE_COEFFECIENT * distance;

            const lastTwoPoints = [
                { lat: lastLocation.latitude, lng: lastLocation.longitude },
                { lat: latitude, lng: longitude }
            ];

            const additionalElevationGain = await getElevationGainBetweenTwoPoints(lastTwoPoints);
            const originElevation = trip.elevationGain;
            trip.scores += ELEVATION_GAIN_COEFFECIENT * additionalElevationGain;

            if (additionalElevationGain !== null) {
                trip.elevationGain += additionalElevationGain;
            }

            // get goal, check if complete or not
            const distanceGoal = trip.distanceGoal.distance;
            const distanceGoalDurationLimit = trip.distanceGoal.duration * 60 * 1000;
            const duration = new Date(timestamp) - new Date(trip.startDate);

            if (trip.distanceGoal.status === 'inProgress') {
                trip.distanceGoal.endDistance = trip.distance;
                trip.distanceGoal.endDate = new Date(timestamp);
                if (trip.distance >= distanceGoal && duration <= distanceGoalDurationLimit) {
                    distanceGoalSuccess = true;
                    trip.distanceGoal.status = 'success';
                    trip.scores += EXERCISE_GOAL_COEFFECIENT * trip.level;
                }
                else if (duration > distanceGoalDurationLimit) {
                    trip.distanceGoal.endDistance = originDistance;
                    trip.distanceGoal.status = 'failed';
                } else {
                    // assess user fitness
                    if (duration >= (FITNESS_ASSESSMENT_TIME * 60 * 1000) && !trip.fitnessAssessed) {
                        trip.fitnessAssessed = true;
                        // Calculate average speed (in meters per millisecond)
                        const averageSpeed = trip.distance / duration;
                        // Calculate remaining distance to achieve the goal
                        const remainingDistance = distanceGoal - trip.distance;
                        // Calculate remaining time to achieve the goal
                        const remainingTime = distanceGoalDurationLimit - duration;
                        // Calculate the distance the player can cover with the average speed in the remaining time
                        const possibleDistanceWithAverageSpeed = averageSpeed * remainingTime;

                        if ((possibleDistanceWithAverageSpeed < remainingDistance) && (possibleDistanceWithAverageSpeed > 0)) {
                            trip.distanceGoal.distance = trip.distance + possibleDistanceWithAverageSpeed;
                            goalModified = true;
                        }
                    }
                }

            }

            // check if player has not found bird for a duration minutes
            const durationPlayerNotFoundBird = new Date(timestamp) - new Date(trip.lastTimeFoundBird);
            if (trip.isEdugaming && durationPlayerNotFoundBird > (BIRD_FLOW_DURATION * 60 * 1000) && !trip.quiz) {
                trip.lastTimeFoundBird = new Date(timestamp);

                // Fetch the user details using userId
                const user = await User.findById(userId);

                // Determine bird rarity based on probabilities
                const randomNum = Math.random() * 100;
                let rarity;
                if (randomNum <= RARITY_1_PROB) rarity = 1;
                else if (randomNum <= RARITY_1_PROB + RARITY_2_PROB) rarity = 2;
                else if (randomNum <= RARITY_1_PROB + RARITY_2_PROB + RARITY_3_PROB) rarity = 3;
                else if (randomNum <= RARITY_1_PROB + RARITY_2_PROB + RARITY_3_PROB + RARITY_4_PROB) rarity = 4;
                else if (randomNum <= RARITY_1_PROB + RARITY_2_PROB + RARITY_3_PROB + RARITY_4_PROB + RARITY_5_PROB) rarity = 5;
                else rarity = 6;

                // Fetch birds of the determined rarity that the user doesn't own
                const birdsNotOwned = await Bird.find({ rarity: rarity, _id: { $nin: user.myBirds } });

                let selectedBird;
                if (birdsNotOwned.length > 0) {
                    // Randomly select a bird from the birdsNotOwned list
                    selectedBird = birdsNotOwned[Math.floor(Math.random() * birdsNotOwned.length)];
                } else {
                    // User owns all birds of this rarity, so randomly select any bird of this rarity
                    const allBirdsOfRarity = await Bird.find({ rarity: rarity });
                    selectedBird = allBirdsOfRarity[Math.floor(Math.random() * allBirdsOfRarity.length)];
                }

                // Randomly select questions for the quiz based on the bird's rarity
                const selectedQuestions = selectRandomQuestions(selectedBird);

                // Set the quiz field of the trip
                trip.quiz = {
                    birdName: selectedBird.name,
                    birdRarity: selectedBird.rarity,
                    questions: selectedQuestions,
                    isFlowHelper: true
                };
            }

            // check if the new time is invalid
            const timeDifference = new Date(timestamp) - new Date(lastLocation.timestamp);

            if (timeDifference > 1800000) { // 30 minutes in milliseconds
                trip.isActive = false;
                await trip.save();
                await session.commitTransaction();
                session.endSession();
                return res.status(400).send("Trip ended due to long time inactivated.");
            } else if (distance > 500) { // More than 500 meters
                if (trip.suspiciousLocation) {
                    // Delete last location and add new location, reset flag
                    trip.locations.pop();
                    trip.suspiciousLocation = false;
                } else {
                    // Add location and set flag
                    trip.suspiciousLocation = true;
                }
                trip.locations.push({ latitude, longitude, timestamp });
                trip.endDate = new Date(timestamp);
            } else {
                trip.locations.push({ latitude, longitude, timestamp });
                trip.suspiciousLocation = false; // Resetting the flag if the previous was suspicious
                trip.endDate = new Date(timestamp);
            }

            await trip.save();
            await session.commitTransaction();
            session.endSession();
            if (goalModified) {
                return res.status(207).json(trip);  // 207 Multi-Status
            } else {
                return res.status(200).json(trip);
            }

        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error(error);
            return res.status(500).send("Error computing distance using Google Maps.");
        }
    } else {
        trip.locations.push({ latitude, longitude, timestamp });
        trip.startDate = new Date(timestamp);
        trip.endDate = new Date(timestamp);
        await trip.save();
        await session.commitTransaction();
        session.endSession();
        return res.status(200).json(trip);
    }
});

router.get("/getActiveTrip", verifyToken, async (req, res) => {
    const userId = req.user._id;

    // This populates the images for a trip, and for each image, it populates the birdId
    const trip = await Trip.findOne({ userId, isActive: true })
        .populate([
            {
                path: 'images',
                model: 'Image',
                populate: {
                    path: 'birdId',
                    model: 'Bird'
                }
            }
        ]);

    if (!trip) return res.send("No active trip");

    return res.status(200).json(trip);
});

router.get("/getInactiveTrips", verifyToken, async (req, res) => {
    const userId = req.user._id;
    const trip = await Trip.find({ userId, isActive: false });

    if (!trip) return res.send("No inactive trip");

    return res.status(200).json(trip);
});

router.get("/getTrip/:tripId", verifyToken, async (req, res) => {
    const userIdFromToken = req.user._id;
    const tripId = req.params.tripId;

    // This populates the images for a trip, and for each image, it populates the birdId
    const trip = await Trip.findById(tripId).populate([
        {
            path: 'images',
            model: 'Image',
            populate: {
                path: 'birdId',
                model: 'Bird'
            }
        }
    ]);

    // If no trip is found with the given ID
    if (!trip) return res.status(404).send("Trip not found");

    // Check if the user ID from the token matches the user ID associated with the trip
    if (trip.userId.toString() !== userIdFromToken.toString()) {
        return res.status(403).send("Unauthorized: You can't access this trip.");
    }

    return res.status(200).json(trip);
});

router.post("/endTrip", verifyToken, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const userId = req.user._id;
        const user = await User.findById(req.user._id);

        const trip = await Trip.findOne({ userId, isActive: true });
        if (!trip) return res.status(400).send("No active trip found.");

        if (trip.distanceGoal.status === 'inProgress') {
            trip.distanceGoal.status = 'failed';
        }

        if (trip.isEdugaming) {
            // Update bird count goals that are inProgress to failed
            for (let goal of trip.birdCountGoals) {
                if (goal.status === 'inProgress') {
                    goal.status = 'failed';
                }
            }
        }

        trip.isActive = false;
        trip.endDate = Date.now();
        trip.quiz = null;

        user.totalWalkingDistance += trip.distance;
        user.totalElevationGain += trip.elevationGain;

        user.scores += trip.scores;

        checkChallenges(user);

        await trip.save();
        await user.save();
        await session.commitTransaction();
        session.endSession();
        return res.status(200).json(trip);
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).send('Server Error');
    }
});

const checkChallenges = (user) => {
    // Bird Collection Challenge
    if (user.myBirds.length >= BIRD_COLLECTION_CHALLANGES_BRONZE && !user.achievedChallanges.some(ch => ch.type === 'birdCollection' && ch.level === 'bronze')) {
        user.achievedChallanges.push({ type: 'birdCollection', level: 'bronze' });
        user.scores += BRONZE_CHALLANGE;
    }
    if (user.myBirds.length >= BIRD_COLLECTION_CHALLANGES_SILVER && !user.achievedChallanges.some(ch => ch.type === 'birdCollection' && ch.level === 'silver')) {
        user.achievedChallanges.push({ type: 'birdCollection', level: 'silver' });
        user.scores += SILVER_CHALLANGE;
    }
    if (user.myBirds.length >= BIRD_COLLECTION_CHALLANGES_GOLD && !user.achievedChallanges.some(ch => ch.type === 'birdCollection' && ch.level === 'gold')) {
        user.achievedChallanges.push({ type: 'birdCollection', level: 'gold' });
        user.scores += GOLD_CHALLANGE;
    }

    // Correct Quizzes Challenge
    if (user.totalCorrectQuizes >= CORRECT_QUIZZES_CHALLANGES_BRONZE && !user.achievedChallanges.some(ch => ch.type === 'correctQuizzes' && ch.level === 'bronze')) {
        user.achievedChallanges.push({ type: 'correctQuizzes', level: 'bronze' });
        user.scores += BRONZE_CHALLANGE;
    }
    if (user.totalCorrectQuizes >= CORRECT_QUIZZES_CHALLANGES_SILVER && !user.achievedChallanges.some(ch => ch.type === 'correctQuizzes' && ch.level === 'silver')) {
        user.achievedChallanges.push({ type: 'correctQuizzes', level: 'silver' });
        user.scores += SILVER_CHALLANGE;
    }
    if (user.totalCorrectQuizes >= BCORRECT_QUIZZES_CHALLANGES_GOLD && !user.achievedChallanges.some(ch => ch.type === 'correctQuizzes' && ch.level === 'gold')) {
        user.achievedChallanges.push({ type: 'correctQuizzes', level: 'gold' });
        user.scores += GOLD_CHALLANGE;
    }

    // Walking Distance Challenge
    if (user.totalWalkingDistance >= WALKING_DISTANCE_CHALLANGES_BRONZE && !user.achievedChallanges.some(ch => ch.type === 'walkingDistance' && ch.level === 'bronze')) {
        user.achievedChallanges.push({ type: 'walkingDistance', level: 'bronze' });
        user.scores += BRONZE_CHALLANGE;
    }
    if (user.totalWalkingDistance >= WALKING_DISTANCE_CHALLANGES_SILVER && !user.achievedChallanges.some(ch => ch.type === 'walkingDistance' && ch.level === 'silver')) {
        user.achievedChallanges.push({ type: 'walkingDistance', level: 'silver' });
        user.scores += SILVER_CHALLANGE;
    }
    if (user.totalWalkingDistance >= WALKING_DISTANCE_CHALLANGES_GOLD && !user.achievedChallanges.some(ch => ch.type === 'walkingDistance' && ch.level === 'gold')) {
        user.achievedChallanges.push({ type: 'walkingDistance', level: 'gold' });
        user.scores += GOLD_CHALLANGE;
    }

    // Elevation Gain Challenge
    if (user.totalElevationGain >= ELEVATION_GAIN_CHALLANGES_BRONZE && !user.achievedChallanges.some(ch => ch.type === 'elevationGain' && ch.level === 'bronze')) {
        user.achievedChallanges.push({ type: 'elevationGain', level: 'bronze' });
        user.scores += BRONZE_CHALLANGE;
    }
    if (user.totalElevationGain >= ELEVATION_GAIN_CHALLANGES_SILVER && !user.achievedChallanges.some(ch => ch.type === 'elevationGain' && ch.level === 'silver')) {
        user.achievedChallanges.push({ type: 'elevationGain', level: 'silver' });
        user.scores += SILVER_CHALLANGE;
    }
    if (user.totalElevationGain >= ELEVATION_GAIN_CHALLANGES_GOLD && !user.achievedChallanges.some(ch => ch.type === 'elevationGain' && ch.level === 'gold')) {
        user.achievedChallanges.push({ type: 'elevationGain', level: 'gold' });
        user.scores += GOLD_CHALLANGE;
    }
}


router.post('/submitQuizResults', verifyToken, async (req, res) => {
    let activeTrip;
    try {
        const userId = req.user._id;
        const user = await User.findById(req.user._id);
        const quizResults = req.body.quizResults;

        // Find the active trip and set the quiz to null
        activeTrip = await Trip.findOne({ userId: userId, isActive: true });
        let birdRarity = 0;
        const isFlowHelper = activeTrip.quiz.isFlowHelper;
        const birdName = activeTrip.quiz.birdName;
        const bird = await Bird.findOne({ name: birdName });

        if (activeTrip) {
            if (activeTrip.quiz.birdRarity) {
                birdRarity = activeTrip.quiz.birdRarity
            }
            activeTrip.quiz = null;
            await activeTrip.save();
        }

        if (!quizResults) {
            return res.status(200).send('Quiz Result is null');
        }

        let scores = QUIZ_CORRECT_QUESTION_REWARD_COEFFICIENT * quizResults.correctQuestions;
        if (quizResults.correctQuestions === quizResults.totalQuestions) {
            scores += QUIZ_FULL_MARKS_REWARD_COEFFICIENT * birdRarity;
            user.totalCorrectQuizes += 1;
            await user.save();
        }

        activeTrip.scores += scores;
        await activeTrip.save();

        // if this is a flow helper quiz and user answer all questions correctly, 
        // award user the bird and scores, same code as /upload
        if (quizResults.correctQuestions === quizResults.totalQuestions && isFlowHelper) {
            const timestamp = Date.now();
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

            const lastLocation = activeTrip.locations[activeTrip.locations.length - 1];

            const randomImageUrl = bird.images[Math.floor(Math.random() * bird.images.length)];
            // create image
            const newImage = new Image({
                s3Key: randomImageUrl,
                userId: req.user._id,
                location: {
                    lat: lastLocation.latitude,
                    lng: lastLocation.longitude
                },
                timestamp: timestamp,
                birdId: bird._id
            });

            await newImage.save();

            // Update the trip's images array by pushing the new image's ObjectId
            activeTrip.images.push(newImage._id);
            activeTrip.lastTimeFoundBird = timestamp;

            // Check if the identified bird is already in the user's myBirds array
            const user = await User.findById(req.user._id);
            if (!user.myBirds.includes(bird._id)) {
                user.myBirds.push(bird._id);
                activeTrip.scores += NEW_BIRD_REWARD_COEFFECIENT * birdRarity;
                await user.save();
            } else {
                activeTrip.scores += REPEAT_BIRD_REWARD_COEFFECIENT * birdRarity;
            }

            await activeTrip.save();
        }

        res.status(200).send('Quiz results processed successfully');
    } catch (error) {
        console.log(error.message)
        if (activeTrip) {
            activeTrip.quiz = null;
            await activeTrip.save();
        }
        res.status(500).send('Server Error');
    }
});

async function getElevationGainBetweenTwoPoints(path) {
    // If array does not has 2 points, return elevation gain as 0
    if (path.length !== 2) {
        return 0;
    }

    const basePath = 'https://maps.googleapis.com/maps/api/elevation/json';
    const pathString = path.map(point => `${point.lat},${point.lng}`).join('|');
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    try {
        const response = await axios.get(`${basePath}?path=${pathString}&samples=${path.length}&key=${apiKey}`);

        if (response.data.status === 'OK') {
            const elevationData = response.data.results;
            let elevationChange = elevationData[1].elevation - elevationData[0].elevation;
            return elevationChange > 0 ? elevationChange : 0;
        } else {
            console.error("Error computing elevation gain:", error);
        }
    } catch (error) {
        throw error;
    }
}

function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth radius in meters
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

module.exports = router;
