const express = require('express');
const { User } = require("../../db/schema");
const bcrypt = require("bcrypt");
const { createToken } = require("../../middleware/auth.js");
const { verifyToken } = require("../../middleware/auth.js");
const router = express.Router();
const {
    LEVEL_UP_COEFFICIENT,
    KIWI_STAGE2_LEVEL,
    KIWI_STAGE3_LEVEL,
    KIWI_STAGE4_LEVEL,
    KIWI_STAGE5_LEVEL,
    KIWI_STAGE6_LEVEL,
} = require('../../gameConstants');

// Create new account
router.post("/create", async (req, res) => {
    // Must send username and password
    const { username, password } = req.body;
    if (!username || !password) return res.sendStatus(422);

    // duplicate usernames not allowed
    let user = await User.findOne({ username });
    if (user) return res.status(409).send("Username already exists");

    // create user
    user = await User.create({
        username,
        passHash: await bcrypt.hash(password, 10),
    });

    // Create and sign a JWT token
    const token = createToken(user._id.toString(), username);

    return res.status(201).json({ token });
});

// Login to existing account
router.post("/login", async (req, res) => {
    // Must send username and password
    const { username, password } = req.body;
    if (!username || !password) return res.sendStatus(422);

    // User must exist
    let user = await User.findOne({ username });
    if (!user) return res.sendStatus(401);

    // Password must be correct
    const isPasswordOk = await bcrypt.compare(password, user.passHash);
    if (!isPasswordOk) return res.sendStatus(401);

    // Create and sign a JWT token
    const token = createToken(user._id.toString(), username);

    return res.status(200).json({ token });
});

// get username by token
router.get("/getUsernameFromToken", verifyToken, async (req, res) => {
    return res.json(req.user.username);
})

// get a list of all users in the database for authenticated user
router.get("/", verifyToken, async (req, res) => {
    try {
        // use projection to only return username, not password
        const users = await User.find({}, 'username kiwiStage');
        return res.json(users);
    } catch (err) {
        console.error(err);
        // server error
        return res.sendStatus(500);
    }
});


// search username by substring, order by best match
router.get("/search/:substring", verifyToken, async (req, res) => {
    const substring = req.params.substring;

    const pipeline = [
        {
            $match: {
                username: new RegExp(substring)
            }
        },
        {
            $addFields: {
                matchScore: {
                    $indexOfCP: ["$username", substring]
                }
            }
        },
        {
            $sort: {
                matchScore: 1
            }
        },
        {
            $limit: 10
        }
    ];

    const users = await User.aggregate(pipeline);

    res.json(users);
});

// get user information by username
router.get("/:username", verifyToken, async (req, res) => {
    const user = await User.findOne({ username: req.params.username }, {
        'passHash': 0,
        'friends': 0
    });

    if (!user) {
        return res.sendStatus(404);
    }

    return res.json(user);
})

// Level Up Kiwi Bird
router.post("/levelUp", verifyToken, async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send("User not found.");
        }

        if (user.kiwiLevel === 100) {
            return res.status(400).send("Your kiwi bird reach max level!");
        }

        const requiredExpForNextLevel = user.kiwiLevel * LEVEL_UP_COEFFICIENT;

        if (user.scores >= requiredExpForNextLevel) {
            user.kiwiLevel += 1;
            user.kiwiExp = 0;
            user.scores -= requiredExpForNextLevel;
            user.kiwiStage = getKiwiStage(user.kiwiLevel);
        } else {
            user.kiwiExp += user.scores;
            user.scores = 0;
        }

        await user.save();

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error leveling up Kiwi bird.");
    }
});

const getKiwiStage = (level) => {
    if (level < KIWI_STAGE2_LEVEL) return 1;
    if (level < KIWI_STAGE3_LEVEL) return 2;
    if (level < KIWI_STAGE4_LEVEL) return 3;
    if (level < KIWI_STAGE5_LEVEL) return 4;
    if (level < KIWI_STAGE6_LEVEL) return 5;
    return 6;
};

module.exports = router;
