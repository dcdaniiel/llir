const { PersistedEntity } = require('./base');

class ProductImages extends PersistedEntity {
  static getEntityClass() {
    return ProductImages;
  }

  static serialize(obj) {
    return {
      id: obj._id,
      product_id: obj._product_id,
      image_id: obj._image_id,
      created_at: obj._created_at,
      updated_at: obj._updated_at,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const product = new ProductImages(
        serialized.product_id,
        serialized.image_id
      );

      product._id = serialized.id;
      product._created_at = serialized.created_at;
      product._updated_at = serialized.updated_at;

      return product;
    }

    return undefined;
  }

  constructor(product_id, image_id) {
    super();

    this._product_id = product_id;
    this._image_id = image_id;
  }

  get product_id() {
    return this._product_id;
  }

  get image_id() {
    return this._image_id;
  }
}

module.exports = { ProductImages };
