const bcrypt = require("bcryptjs");

const db = require("../../dbHelpers/users");

const { generateToken } = require("../../dbHelpers/auth");

const validateNewUser = () => {
    return async (req, res, next) => {
        if (!req.body.username || !req.body.password || !req.body.first_name || !req.body.last_name) {
            return res.status(500).json({message: "Please provide all required credentials"});
        };
        next();
    };
};

const validateUserLogin = () => {
    return async (req, res, next) => {
        if (!req.body.username || !req.body.password) {
            return res.status(500).json({message: "Please provide all required credentials"});
        };
        next();
    };
};

const validateLogin = () => {
    return async (req, res, next) => {
        const username = req.body.username.toLowerCase();
        const password = req.body.password;

        if (username && password) {
            let user = await db.userLogin(username);

            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                req.token = token;
                next();
            } else {
                res.status(401).json({message: "Invalid credentials"});
            };
        } else {
            res.status(400).json({message: "Please provide all required credentials"});
        };
    };
};

module.exports = {
    validateNewUser,
    validateUserLogin,
    validateLogin
}