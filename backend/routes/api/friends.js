const express = require('express');
const { User } = require("../../db/schema");
const { verifyToken } = require("../../middleware/auth.js");
const router = express.Router();

// Retrieve User's Friend List
router.get("/getfriends", verifyToken, async (req, res) => {
    try {
        // Find the user and populate their friends list
        const user = await User.findById(req.user._id).populate('friends', 'username kiwiStage');
        if (!user) {
            return res.sendStatus(404);
        }
        return res.json(user.friends);
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
});

// Add Friend by Username
router.post("/addfriend", verifyToken, async (req, res) => {
    try {
        const friendUsername = req.body.username;

        // User add themself
        if (friendUsername === req.user.username) {
            return res.status(400).json({ message: 'You can not add yourself!' });
        }

        // Find the friend by username
        const friend = await User.findOne({ username: friendUsername });
        if (!friend) {
            return res.status(404).json({ message: 'Friend not found.' });
        }

        // Find the authenticated user
        const user = await User.findById(req.user._id);
        if (user.friends.includes(friend._id)) {
            return res.status(400).json({ message: 'Friend already added.' });
        }

        // Add the friend's ObjectId to the friends array and save
        user.friends.push(friend._id);
        await user.save();

        return res.status(201).json({ message: 'Friend added successfully.' });
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
});

// Remove Friend by Username
router.delete("/removefriend", verifyToken, async (req, res) => {
    try {
        const friendUsername = req.body.username;

        // Find the friend by username to get their ObjectId
        const friend = await User.findOne({ username: friendUsername });
        if (!friend) {
            return res.status(404).json({ message: 'Friend not found.' });
        }

        // Find the authenticated user
        const user = await User.findById(req.user._id);
        if (!user.friends.includes(friend._id)) {
            return res.status(400).json({ message: 'Friend not in friend list.' });
        }

        // Remove the friend's ObjectId from the friends array and save
        user.friends.pull(friend._id);
        await user.save();

        return res.status(200).json({ message: 'Friend removed successfully.' });
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
});



module.exports = router;
