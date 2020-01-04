const express = require("express");

const router = express.Router({
    mergeParams: true
});

const commentRoute = require("./commentRoute");

const { validatePostId, validateNewPost, getPostComments } = require('../Middleware/Validation/postValidate');

const db = require("../dbHelpers/posts");

router.use("/comments", commentRoute);

router.get("/", async(req, res, next) => {
    try {
        res.json(await db.getPostByUserId(req.params.id));
    } catch(err) {
        next(err);
    };
});

//route for all posts
router.get("/all", getPostComments(), async (req, res, next) => {
    try {
        res.json(req.posts);
    } catch(err) {
        next(err);
    };
});

router.get("/:id", validatePostId(), async(req, res, next) => {
    res.json(req.post)
});

router.get("/:id/comments", validatePostId(), async (req, res, next) => {
    try {
        res.json(await db.getPostComments(req.params.id));
    } catch(err) {
        next(err);
    };
});

router.post("/", validateNewPost(), async(req, res, next) => {
    try {
        res.json(await db.addPost(req.body));
    } catch(err) {
        next(err);
    };
});

router.put("/:id", validatePostId(), async (req, res, next) => {
    try {
        res.json(await db.updatePost(req.params.id, req.body));
    } catch(err) {
        next(err);
    };
});

router.delete("/:id", validatePostId(), async (req, res, next) => {
    try {
        res.json(await db.deletePost(req.params.id));
    } catch(err) {
        next(err);
    };
});

module.exports = router;