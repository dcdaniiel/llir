exports.up = (knex) =>
  knex.schema.createTable('products', (table) => {
    table.uuid('id').primary();
    table
      .uuid('company_id')
      .references('companies.id')
      .notNullable()
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.string('name', 100).notNullable();
    table.float('price', 10).notNullable();
    table.string('type', 10);
    table
      .uuid('category_id')
      .references('categories.id')
      .notNullable()
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('products');
