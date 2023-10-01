const jwt = require("jsonwebtoken");
const { User } = require("../db/schema");

// Middleware to verify the JWT token in the authorization header in the request
async function verifyToken(req, res, next) {
    let token = req.headers["authorization"]; // Check header

    // If no token provided, send a 401
    if (!token) return res.sendStatus(401);

    try {
        // get rid of the "Bearer"
        token = token.slice(token.indexOf(" ") + 1);

        // decode the token to a User object
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        // check if the user actually exist in our DB
        const user = await User.findById(decoded._id);

        if (!user) return res.sendStatus(401);
        req.user = user;
        return next();
    } catch (err) {
        return res.sendStatus(401);
    }
}

// Create a JWT for the given username
function createToken(_id, username, expiresIn = "24h") {
    return jwt.sign({ _id, username }, process.env.JWT_KEY, { expiresIn });
}

module.exports = { verifyToken, createToken };