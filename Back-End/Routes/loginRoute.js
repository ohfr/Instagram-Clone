const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const db = require("../dbHelpers/users");

const { validateUserLogin, validateLogin } = require("../Middleware/Validation/userValidate");

router.post("/", validateUserLogin(),validateLogin(), async (req, res, next) => {
    res.json(req.token);
});

module.exports = router;