const bcrypt = require("bcryptjs");

exports.seed = async function(knex) {
  await knex('users').truncate();
  await knex("users").insert([
    {username: "Dan", password: bcrypt.hashSync('password', 12), first_name: "Dan", last_name: "Martin"},
    {username: "Jordan", password: bcrypt.hashSync('password', 12), first_name: "Jordan", last_name: "Campbell"}
  ]);
};