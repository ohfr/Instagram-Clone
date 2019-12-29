exports.seed = async function(knex) {
  await knex("posts").truncate();
  await knex("posts").insert([
    {user_id: 1, title: 'Christmas', image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1535474908-best-fake-christmas-trees-1-1535474886.jpg"},
    {user_id: 2, title: "turkey", image: "https://www.thesun.co.uk/wp-content/uploads/2019/12/alditurkey.png"}
  ]);
};