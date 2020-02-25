exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments();
  
        tbl.string('username', 128).unique().notNullable();
        tbl.string('password', 128).notNullable();
        tbl.string('first_name', 128).notNullable();
        tbl.string('last_name').notNullable();
    })
    .createTable('likes', tbl => {
        tbl.increments();
  
        tbl.string('username', 128).notNullable().unsigned().references('username').inTable('users');
        tbl.integer('post_id').notNullable().unsigned().references("id").inTable("posts");
  
    })
    .createTable('posts', tbl => {
      tbl.increments();
  
      tbl.string('username').notNullable().references('username').inTable("users");
      tbl.string('title', 128);
      tbl.string('image', 128).notNullable();
    })
    .createTable('comments', tbl => {
        tbl.increments();
  
        tbl.integer('post_id').notNullable().unsigned().references('id').inTable('posts');
        tbl.string('username', 128).notNullable().unsigned().references('username').inTable('users');
        tbl.string('comment', 128).notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
      .dropTableIfExists('posts')
      .dropTableIfExists('comments')
      .dropTableIfExists('likes');
  };
