const db = require("../../dbHelpers/comments");

const validateCommentId = () => {
    return async (req, res, next) => {
        const comment = await db.getComment(req.params.id);

        if (comment) {
            req.comment = comment;
            next();
        } else {
            return res.status(500).json({message: "No comment with specified ID"});
        };
    };
};

const validateCommentBody = () => {
    return async (req, res, next) => {
        if (!req.body.post_id || !req.body.username || !req.body.comment) {
            return res.status(500).json({message: "Please provide all required fields"});
        };
        next();
    };
};


module.exports = {
    validateCommentBody,
    validateCommentId
};