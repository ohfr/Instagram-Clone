const db = require("../data/dbConfig");

const getComment = (id) => {
    return db("comments").where("id", id);
};

const addComment =  async (post) => {
    const newId = await db("comments").insert(post);

    const newComment = await db("comments").where({id: newId[0]}).first();

    return newComment;
};

const deleteComment = (id) => {
    return db("comments").where("id", id).del();
};

const editComment = (id, comment) => {
    return db("comments").where("id", id).update(comment);
};

const getCommentsByPost = (post_id) => {
    return db("comments").join("users", "users.username", "comments.username").where("comments.post_id", post_id).select("users.username", "comments.comment");
};


module.exports = {
    getComment,
    addComment,
    deleteComment,
    editComment,
    getCommentsByPost
};