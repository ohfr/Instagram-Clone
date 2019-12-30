const db = require("../data/dbConfig");

const getPost = () => {
    return db("posts").select();
};

const getPostById = (id) => {
    return db("posts").where("id", id).first();
};

const addPost = (post) => {
    const newId = await db("posts").where("id", id).first();

    const newPost = await db("posts").where({id: newId[0]}).first();

    return newPost;
};

const updatePost = (id, post) => {
    return db("posts").where("id", id).update(post).first();
};

const deletePost = (id) => {
    return db("posts").where("id", id).del();
};

module.exports = {
    getPost,
    getPostById,
    addPost,
    updatePost,
    deletePost
}
