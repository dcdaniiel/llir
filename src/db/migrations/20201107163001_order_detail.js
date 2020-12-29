exports.up = (knex) =>
  knex.schema.createTable('order_detail', (table) => {
    table.uuid('id').primary();
    table
      .uuid('order_id')
      .references('orders.id')
      .notNullable()
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.string('name', 50).notNullable();
    table.float('price').notNullable();
    table.string('type', 50).notNullable();
    table.integer('quantity', 50).notNullable();
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('order_detail');
