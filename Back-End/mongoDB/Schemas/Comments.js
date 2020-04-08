const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "Users",
        required: true
    },
    post: {
        type: mongoose.Schema.ObjectId,
        ref: "Posts",
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

function autoPopulate(next){
    this.populate('author');
    next();
}

commentSchema.pre("find", autoPopulate);

commentSchema.pre("findOne", autoPopulate);

module.exports = mongoose.model("Comments", commentSchema);