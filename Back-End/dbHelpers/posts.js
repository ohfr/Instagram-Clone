const db = require("../data/dbConfig");

const getPost = () => {
    return db("posts").select();
};

const getPostById = (id) => {
    return db("posts").where({id}).first();
};

const getPostByUserId = (user_id) => {
    return db("posts").join("users", "posts.user_id", "users.id").where("posts.user_id", user_id).select("posts.id", "posts.title", "posts.image");
}

const addPost = async (post) => {
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
    deletePost,
    getPostByUserId
};
