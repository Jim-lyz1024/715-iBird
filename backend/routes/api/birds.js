const express = require('express');
const { User, Bird } = require("../../db/schema");
const { verifyToken } = require("../../middleware/auth.js");
const router = express.Router();

router.get("/getAllbirds", verifyToken, async (req, res) => {
    try {
        const birds = await Bird.find({});  // Fetch all birds from the Bird collection
        return res.json(birds);
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
});

// Retrieve Birds Owned by the User
router.get("/getMybirds", verifyToken, async (req, res) => {
    try {
        // Find the user and populate their myBirds list
        const user = await User.findById(req.user._id).populate('myBirds');
        if (!user) {
            return res.sendStatus(404);
        }
        return res.json(user.myBirds);
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
});

router.get("/getUserbirds/:username", verifyToken, async (req, res) => {
    try {
        // Find the user and populate their myBirds list
        const user = await User.findOne({ username: req.params.username }).populate('myBirds');
        if (!user) {
            return res.sendStatus(404);
        }
        return res.json(user.myBirds);
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
});

// Retrieve Bird by Name
router.get("/getBird/:name", verifyToken, async (req, res) => {
    try {
        // Get the bird name from the route parameters
        const birdName = req.params.name;

        if (!birdName) {
            return res.status(400).send("Bird name is required.");
        }

        // Find the bird by name
        const bird = await Bird.findOne({ name: birdName });

        if (!bird) {
            return res.status(404).send("Bird not found.");
        }

        return res.json(bird);
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
});


module.exports = router;
