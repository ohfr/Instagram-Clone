exports.seed = async function(knex) {
  await knex("likes").truncate();
  await knex("likes").insert([
    {username: "Dan", post_id: 2},
    {username: "Jordan", post_id: 1}
  ])
};