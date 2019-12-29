
exports.seed = async function(knex) {
  await knex("likes").truncate();
  await knex("likes").insert([
    {user_id: 1, post_id: 2},
    {user_id: 2, post_id: 1}
  ])
};
