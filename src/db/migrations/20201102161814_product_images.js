exports.up = (knex) =>
  knex.schema.createTable('product_images', (table) => {
    table.uuid('id').primary();
    table
      .uuid('product_id')
      .references('products.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .notNullable();
    table
      .uuid('image_id')
      .references('images.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .notNullable();
    table.timestamps(true);
  });

exports.down = (knex) => knex.schema.dropTable('product_images');
