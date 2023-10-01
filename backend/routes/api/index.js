const express = require('express');

const router = express.Router();

const userRoutes = require("./users.js");
const friendRoutes = require("./friends.js");
const tripRoutes = require("./trips.js")
const imageRoutes = require("./images.js")
const birdRoutes = require("./birds.js")

router.use("/users", userRoutes);
router.use("/friends", friendRoutes);
router.use("/trips", tripRoutes);
router.use("/images", imageRoutes);
router.use("/birds", birdRoutes);

module.exports = router;
