const express = require("express");

const User = require("../Schemas/User");

const router = express.Router();


//write validation middleware
router.post("/", async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        await newUser.save(err => {
            if (err) {
                res.json({message: "An error occurred while saving your information"});
            } else {
                res.status(201).json(newUser)
            }
        })
    } catch(err) {  
        next(err);
    }
});







module.exports = router;
