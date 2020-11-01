exports.up = (knex) =>
  knex.schema.alterTable('users', (table) => {
    table.uuid('avatar_id').references('images.id');
  });

exports.down = (knex) => knex.schema.dropTable('users');
