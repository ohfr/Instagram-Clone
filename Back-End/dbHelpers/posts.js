const db = require("../data/dbConfig");

const getPost = () => {
    return db("posts").select();
};

const getPostById = (id) => {
    return db("posts").where({id}).first();
};

const getPostByUsername = (username) => {
    return db("posts").join("users", "posts.username", "users.username").where("posts.username", username).select("posts.id", "posts.title", "posts.image");
}

const addPost = async (post) => {
    const newId = await db("posts").insert(post);

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
    deletePost,
    getPostByUsername
};
