exports.up = (knex) =>
  knex.schema.createTable('companies', (table) => {
    table.uuid('id').primary();
    table
      .uuid('user_id')
      .references('users.id')
      .notNullable()
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.uuid('avatar_id').references('images.id').onUpdate('CASCADE');
    table.string('name', 255).unique().notNullable();
    table.string('cod', 255).unique().notNullable();
    table.string('phone', 20).notNullable();
    table.jsonb('available_days').notNullable();
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('companies');
