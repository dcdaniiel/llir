const { PersistedEntity } = require('./base');

class OrderDetail extends PersistedEntity {
  static getEntityClass() {
    return OrderDetail;
  }

  static serialize(obj) {
    return {
      id: obj._id,
      order_id: obj._order_id,
      name: obj._name,
      price: obj._price,
      type: obj._type,
      quantity: obj._quantity,
      created_at: obj._created_at,
      updated_at: obj._updated_at,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const order_detail = new OrderDetail(
        serialized.order_id,
        serialized.name,
        serialized.price,
        serialized.type,
        serialized.quantity
      );

      order_detail._id = serialized.id;
      order_detail._created_at = serialized.created_at;
      order_detail._updated_at = serialized.updated_at;

      return order_detail;
    }
    return undefined;
  }

  constructor(order_id, name, price, type, quantity) {
    super();

    this._order_id = order_id;
    this._name = name;
    this._price = price;
    this._type = type;
    this._quantity = quantity;
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price;
  }

  get type() {
    return this._type;
  }

  get quantity() {
    return this._quantity;
  }
}

module.exports = { OrderDetail };
