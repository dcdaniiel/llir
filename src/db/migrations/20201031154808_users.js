exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary();
    table.string('name', 255).notNullable();
    table.string('email', 50).notNullable().unique();
    table.string('phone', 20).notNullable().unique();
    table.string('password', 20).notNullable();
    table.timestamp('birthdate').notNullable();
    table.timestamps(true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
