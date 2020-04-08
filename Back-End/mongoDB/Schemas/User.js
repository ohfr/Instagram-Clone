const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    posts: {
        type: Number,
        default: 0
    },
    followers: [
        { type: mongoose.Schema.ObjectId, ref: "Users"}
    ],
    following: [
        {type: mongoose.Schema.ObjectId, ref: "Users"}
    ],
    oAuthID: Number,

});

userSchema.virtual('likes', {
    ref: "Posts",
    localField: "_id",
    foreignField: 'likes'
})

module.exports = mongoose.model("Users", userSchema);