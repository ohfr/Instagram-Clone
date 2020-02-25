const express = require("express");

const router = express.Router({
    mergeParams: true
});

const commentRoute = require("./commentRoute");

const { validatePostId, validateNewPost, getPostComments } = require('../Middleware/Validation/postValidate');

const db = require("../dbHelpers/posts");

router.use("/comments", commentRoute);

router.get("/user/:id", async(req, res, next) => {
    try {
        res.json(await db.getPostByUserId(req.params.id));
    } catch(err) {
        next(err);
    };
});

router.get("/:username", async(req, res, next) => {
    try {
        res.json(await db.getPostByUsername(req.params.username));
    }catch(err) {
        next(err);
    };
});

//route for all posts
router.get("/", getPostComments(), async (req, res, next) => {
    try {
        res.json(req.posts);
    } catch(err) {
        next(err);
    };
});

router.get("/:id", validatePostId(), async(req, res, next) => {
    res.json(req.post)
});

router.get("/:post_id/comments", validatePostId(), async (req, res, next) => {
    try {
        res.json(await db.getPostComments(req.params.post_id));
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

router.put("/:post_id", validatePostId(), async (req, res, next) => {
    try {
        res.json(await db.updatePost(req.params.post_id, req.body));
    } catch(err) {
        next(err);
    };
});

router.delete("/:post_id", validatePostId(), async (req, res, next) => {
    try {
        res.json(await db.deletePost(req.params.post_id));
    } catch(err) {
        next(err);
    };
});

module.exports = router;