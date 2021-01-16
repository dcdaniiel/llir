const { PersistedEntity } = require('./base');

class Product extends PersistedEntity {
  static getEntityClass() {
    return Product;
  }

  static serialize(obj) {
    return {
      id: obj._id,
      name: obj._name,
      price: obj._price,
      type: obj._type,
      description: obj._description,
      category_id: obj._category_id,
      company_id: obj._company_id,
      updated_at: obj._updated_at,
      created_at: obj._created_at,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const product = new Product(
        serialized.company_id,
        serialized.name,
        serialized.price,
        serialized.type,
        serialized.category_id,
        serialized.description
      );

      product._id = serialized.id;
      product._created_at = serialized.created_at;
      product._updated_at = serialized.updated_at;

      return product;
    }

    return undefined;
  }

  constructor(company_id, name, price, type, category_id, description) {
    super();

    this._company_id = company_id;
    this._name = name;
    this._price = price;
    this._type = type;
    this._category_id = category_id;
    this._description = description;
  }

  get company_id() {
    return this._company_id;
  }
}

module.exports = { Product };
