const { PersistedEntity } = require('./base');

class Image extends PersistedEntity {
  static getEntityClass() {
    return Image;
  }

  static serialize(obj) {
    return {
      id: obj._id,
      source: obj._source,
      created_at: obj._created_at,
      updated_at: obj._updated_at,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const img = new Image(serialized.source);

      img._id = serialized.id;
      img._created_at = serialized.created_at;
      img._updated_at = serialized.updated_at;

      return img;
    }

    return undefined;
  }

  constructor(source) {
    super();

    this._source = source;
  }

  get source() {
    return this._source;
  }

  set source(source) {
    this._source = source;
  }
}

module.exports = { Image };
