const express = require("express");

const router = express.Router();

const db = require("../dbHelpers/users");

const { validateUserLogin, validateLogin, validateNewUser, validateUserId, validateUsername } = require("../Middleware/Validation/userValidate");

const bcrypt = require("bcryptjs");

const { generateToken, verifyToken } = require("../dbHelpers/auth");

const postRoute = require("../Routes/postRoute");



// router.use("/:id/posts", postRoute);

router.get("/:id", validateUserId(), async (req, res, next) => {
    try {
        res.json(req.user);
    } catch(err) {
        next(err);
    };
});

//get user info from token
router.get("/", verifyToken, validateUsername(), async (req, res, next) => {
    res.json(req.user)
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

        res.json({id: user.id, username: user.username, token});
    } catch(err) {
        next(err);
    };
});

module.exports = router;
