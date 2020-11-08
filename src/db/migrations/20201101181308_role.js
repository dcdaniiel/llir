exports.up = (knex) =>
  knex.schema.createTable('roles', (table) => {
    table.uuid('id').primary();
    table.string('role').notNullable();
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('roles');
