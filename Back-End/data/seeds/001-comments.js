exports.seed = async function(knex) {
  await knex("comments").truncate();
  await knex("comments").insert([
    {post_id: 1, username: "Jordan",comment: "Nice!"},
    {post_id: 2, username: "Dan", comment: "Love turkey!"}
  ]);
};
