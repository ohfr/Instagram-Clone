const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        trim: true,
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "Users",
        required: true
    }

});

postSchema.virtual("comments", {
    ref: "Comments",
    localField: "_id",
    foreignField: "post"
})

module.exports = mongoose.model("Posts", postSchema);