const db = require("../../dbHelpers/posts");

const commentDb = require("../../dbHelpers/comments");

const validatePostId = () => {
    return async (req, res, next) => {
        let validPost = await db.getPostById(req.params.id);

        if (validPost) {
            let comments = await commentDb.getCommentsByPost(req.params.id)
            if (comments) {
                validPost.comments = comments;
            };
            req.post = validPost;
            next();
        } else {
            return res.status(500).json({message: "No post with specified ID"});
        };
    };
};

const validateNewPost = () => {
    return async (req, res, next) => {
        if (!req.body.username || !req.body.title || !req.body.image) {
            return res.status(500).json({message: "Please provide all post requirements"});
        };
        next();
    };
};

module.exports = {
    validatePostId,
    validateNewPost
}