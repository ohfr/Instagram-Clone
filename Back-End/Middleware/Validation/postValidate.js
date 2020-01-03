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

const getPostComments = () => {
    return async (req, res, next) => {
        let validPost = await db.getPost();

        if (validPost) {
            const newpost = validPost.map(async (cur) => {
                let comment = await commentDb.getCommentsByPost(cur.id);

                if (comment) {
                    return {
                        ...cur,
                        comments: comment
                    };
                } else {
                    return cur;
                };
            });
            Promise.all(newpost).then(result => {
                console.log(result)
                req.posts = result;
                next();
            });
        } else {
            return res.status(500).json({message: "No posts available"});
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

const asyncForEach = async (arr, cb) => {
    for (let i=0; i < arr.length; i++) {
        await cb(arr[i], i, arr);
    };
};

module.exports = {
    validatePostId,
    validateNewPost,
    getPostComments
}