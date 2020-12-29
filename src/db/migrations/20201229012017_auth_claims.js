exports.up = (knex) =>
  knex.schema.createTable('auth_claims', (table) => {
    table.uuid('id').primary();
    table.string('module', 150).notNullable();
    table.string('claim', 150).notNullable();
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('auth_claims');
