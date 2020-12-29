exports.up = (knex) =>
  knex.schema.createTable('user_auth', (table) => {
    table.uuid('id').primary();
    table
      .uuid('client_company')
      .references('clients_companies.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable();
    table
      .uuid('auth_claim')
      .references('auth_claims.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable();
    table.timestamps(true, true);
  });
exports.down = (knex) => knex.schema.dropTable('user_auth');
