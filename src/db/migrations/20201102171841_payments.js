exports.up = (knex) =>
  knex.schema.createTable('payments', (table) => {
    table.uuid('id').primary();
    table
      .uuid('company_id')
      .references('companies.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .notNullable();
    table.boolean('enabled').notNullable();
    table.string('payment_type', 100).notNullable();
    table.string('description', 150);
    table.timestamps(true);
  });

exports.down = (knex) => knex.schema.dropTable('payments');
