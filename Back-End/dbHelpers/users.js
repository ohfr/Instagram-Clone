const db = require("../data/dbConfig");

const getUsers = () => {
    return db("users").select();
};

const getUser = (id) => {
    return db("users").where("id", id).first();
};

const addUser = async (user) => {
    const newId = await db("users").insert(user);

    const newUser = await db("users").where({id: newId[0]}).first();
    
    return newUser;
};

const userLogin = async (username) => {
    return db("users").where("username", username).first();
};

const updateUser = async (id, newUser) => {
    return db("users").where("id", id).update(newUser).first();
};

module.exports = {
    getUser,
    getUsers,
    addUser,
    userLogin,
    updateUser
}