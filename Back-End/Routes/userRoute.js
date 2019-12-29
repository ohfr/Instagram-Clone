const express = require("express");

const router = express.Router();

const db = require("../dbHelpers/users");

const { validateUserLogin, validateLogin, validateNewUser } = require("../Middleware/Validation/userValidate");

const bcrypt = require("bcryptjs");

const { generateToken } = require("../dbHelpers/auth");

router.get("/:id", async (req, res, next) => {
    try {
        res.json(await db.getUser(req.params.id));
    } catch(err) {
        next(err);
    };
});

router.post("/login", validateUserLogin(),validateLogin(), async (req, res, next) => {
    res.json(req.validate);
});

router.put("update/:id", async (req, res,next) => {
    try {
        await db.updateUser(req.params.id, req.body);

        const newUser = await db.getUser(req.params.id).first();

        res.json(newUser);
    } catch(err) {
        next(err);
    };
});


router.post("/register", validateNewUser(), async (req, res, next) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 12);

        req.body.password = hash;

        let user = await db.addUser(req.body);

        const token = generateToken(user);

        res.json({id: user.id, token});
    } catch(err) {
        next(err);
    };
});

module.exports = router;
