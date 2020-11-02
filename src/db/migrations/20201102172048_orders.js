exports.up = (knex) =>
  knex.schema.createTable('orders', (table) => {
    table.uuid('id').primary();
    table
      .uuid('company_id')
      .references('companies.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .notNullable();
    table
      .uuid('user_id')
      .references('users.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .notNullable();
    table.uuid('payment_id').references('payments.id').notNullable();
    table.timestamp('delivery_day').notNullable();
    table.float('total').notNullable();
    table.string('description', 150);
    table.jsonb('order').notNullable();
    table.string('status', 50).notNullable();
    table.timestamps(true);
  });

exports.down = (knex) => knex.schema.dropTable('orders');
