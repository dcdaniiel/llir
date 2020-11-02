exports.up = (knex) =>
  knex.schema.createTable('images', (table) => {
    table.uuid('id').primary();
    table.string('source').notNullable();
    table.timestamps(true);
  });

exports.down = (knex) => knex.schema.dropTable('images');
