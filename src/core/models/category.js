const { PersistedEntity } = require('./base');

class Category extends PersistedEntity {
  static getEntityClass() {
    return Category;
  }

  static serialize(obj) {
    return {
      id: obj._id,
      name: obj._name,
      created_at: obj._created_at,
      updated_at: obj._updated_at,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const category = new Category(serialized.name);

      category._id = serialized.id;
      category._updated_at = serialized.updated_at;
      category._created_at = serialized.created_at;

      return category;
    }

    return undefined;
  }

  constructor(name) {
    super();

    this._name = name;
  }
}

module.exports = { Category };
