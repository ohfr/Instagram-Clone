
exports.seed = async function(knex) {
  await knex("comments").truncate();
  await knex("comments").insert([
    {post_id: 1, user_id: 2, comment: "Nice!"},
    {post_id: 2, user_id: 1, comment: "Love turkey!"}
  ]);
};
