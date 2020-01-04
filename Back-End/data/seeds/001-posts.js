exports.seed = async function(knex) {
  await knex("posts").truncate();
  await knex("posts").insert([
    {username: "Dan", title: 'Christmas', image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1535474908-best-fake-christmas-trees-1-1535474886.jpg"},
    {username: "Jordan", title: "turkey", image: "https://www.thesun.co.uk/wp-content/uploads/2019/12/alditurkey.png"}
  ]);
};
