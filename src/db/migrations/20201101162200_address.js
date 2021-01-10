exports.up = (knex) =>
  knex.schema.createTable('addresses', (table) => {
    table.uuid('id').primary();
    table
      .uuid('user_id')
      .references('users.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .uuid('company_id')
      .references('companies.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.string('street', 100).notNullable();
    table.string('number', 10).notNullable();
    table.string('city', 50).notNullable();
    table.string('state', 50).notNullable();
    table.string('country', 50).notNullable();
    table.string('zipcode', 50).notNullable();
    table.string('district', 20).notNullable();
    table.string('description', 150).notNullable();
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('addresses');
