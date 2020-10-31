exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.string('phone').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.timestamp('created_at').notNullable();
    table.timestamp('updated_at').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
