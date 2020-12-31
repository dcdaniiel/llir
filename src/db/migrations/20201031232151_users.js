exports.up = (knex) =>
  knex.schema.createTable('users', (table) => {
    table.uuid('id').primary();
    table.uuid('avatar_id').references('images.id');
    table.string('name', 255).notNullable();
    table.string('email', 50).notNullable().unique();
    table.string('phone', 20).notNullable().unique();
    table.string('password', 255).notNullable();
    table.string('salt', 255).unique().notNullable();
    table.string('cpf', 20).notNullable();
    table.timestamp('birthdate').notNullable();
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('users');
