exports.up = (knex) =>
  knex.schema.createTable('categories', (table) => {
    table.uuid('id').primary();
    table.string('name', 150);
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('categories');
