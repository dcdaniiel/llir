exports.up = (knex) =>
  knex.schema.createTable('roles', (table) => {
    table.uuid('id').primary();
    table.uuid('role');
    table.timestamps(true);
  });

exports.down = (knex) => knex.schema.dropTable('roles');
