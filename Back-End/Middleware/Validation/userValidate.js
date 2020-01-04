const bcrypt = require("bcryptjs");

const db = require("../../dbHelpers/users");

const { generateToken } = require("../../dbHelpers/auth");

const postsDb = require("../../dbHelpers/posts");

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
        const { username, password } = req.body;

        if (username && password) {
            let user = await db.userLogin(username);

            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                req.validate = {
                    id: user.id,
                    username: user.username,
                    token
                };
                next();
            } else {
                res.status(401).json({message: "Invalid credentials"});
            };
        } else {
            res.status(400).json({message: "Please provide all required credentials"});
        };
    };
};

const validateUserId = () => {
    return async (req, res, next) => {
        const user = await db.getUser(req.params.id);

        if (user) {
            const posts = await postsDb.getPostByUserId(req.params.id);
            if (posts) {
                user.posts = posts;
            };
            req.user = user;
            next();
        } else {
            res.status(500).json({message: "No user with specified ID"});
        };
    };
};

const validateUsername = () => {
    return async (req, res, next) => {
        const username = req.decoded.username;

        if (username) {
            const user = await db.findUser(username);
            if (user) {
                const token = generateToken(user);
                req.user = {
                    id: user.id,
                    username: user.username,
                    token
                };
                next();
            } else {
                return res.status(500).json({message: "No user with specified username"})
            };
        } else {
            return res.status(500).json({message: "Please provide required credentials"})
        };
    };
};

module.exports = {
    validateNewUser,
    validateUserLogin,
    validateLogin,
    validateUserId,
    validateUsername
};