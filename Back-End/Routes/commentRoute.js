const express = require("express");

const router = express.Router({
    mergeParams: true
});

const db = require("../dbHelpers/comments");

const { validatePostId } = require("../Middleware/Validation/postValidate");

const { validateCommentBody, validateCommentId } = require("../Middleware/Validation/commentValidate");

router.post("/", validatePostId(), validateCommentBody(), async (req, res, next) => {
    try {
        res.json(await db.addComment(req.body));
    } catch(err) {
        next(err);
    };
});

router.put("/:id", validateCommentBody(), validateCommentId(), async (req, res, next) => {
    try {
        res.json(await db.editComment(req.params.id, req.body));
    } catch(err) {
        next(err);
    };
});

router.get("/:id", validateCommentId(), async (req, res, next) => {
    try {
        res.json(await db.getComment(req.params.id));
    } catch(err) {
        next(err);
    };
});



module.exports = router;