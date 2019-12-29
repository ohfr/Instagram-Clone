const jwt = require("jsonwebtoken");
const secret = require("../Secrets/index");

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
        if (err) {
            res.status(400).json({message: "You must be logged in to view this"});
        } else {
            req.decoded = decodedToken;
            next();
        };
    });
};

const generateToken = (user) =>{
    const payload = {
        subject: user.id,
        username: user.username,
    };

    const options = {
        expiresIn: '3d',
    };

    return jwt.sign(payload, secret.jwtSecret, options);
};

module.exports = {verifyToken, generateToken};