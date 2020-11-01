exports.up = (knex) =>
  knex.schema.createTable('companies', (table) => {
    table.uuid('id').primary();
    table.uuid('user_id').references('users.id');
    table.uuid('avatar_id').references('images.id');
    table.text('name', 255).notNullable();
    table.text('phone', 20).notNullable();
    table.jsonb('available_days').notNullable();
  });

exports.down = (knex) => knex.schema.dropTable('companies');
