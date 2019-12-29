const express = require("express");

const db = require("../dbHelpers/users");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { generateToken } = require("../dbHelpers/auth");

const { validateNewUser } = require("../Middleware/Validation/userValidate");

const router = express.Router();

router.post("/", validateNewUser(), async (req, res, next) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 12);

        req.body.password = hash;

        let user = await db.addUser(req.body);

        const token = generateToken(user);

        res.json(token);
    } catch(err) {
        next(err);
    };
});

module.exports = router;