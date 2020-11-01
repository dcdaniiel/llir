exports.up = (knex) =>
  knex.schema.createTable('clients_companies', (table) => {
    table.uuid('id').primary();
    table
      .uuid('role_id')
      .references('roles.id')
      .notNullable()
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .uuid('user_id')
      .references('users.id')
      .notNullable()
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .uuid('company_id')
      .references('companies.id')
      .notNullable()
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.timestamps(true);
  });
exports.down = (knex) => knex.schema.dropTable('clients_company');
