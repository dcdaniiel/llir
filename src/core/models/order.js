const { PersistedEntity } = require('./base');

class OrderStatus {
  static ACCEPT() {
    return 'accept';
  }

  static CANCELLED() {
    return 'cancelled';
  }

  static WAITING_APPROVAL() {
    return 'waiting_approval';
  }
}

class Order extends PersistedEntity {
  static getEntityClass() {
    return Order;
  }

  static serialize(obj) {
    return {
      id: obj._id,
      user_id: obj._user_id,
      company_id: obj._company_id,
      payment_id: obj._payment_id,
      delivery_day: obj._delivery_day,
      total: obj._total,
      description: obj._description,
      items: obj._items,
      status: obj._status,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const order = new Order(
        serialized.user_id,
        serialized.company_id,
        serialized.payment_id,
        serialized.delivery_day,
        serialized.total,
        serialized.description,
        serialized.items,
        serialized.status
      );

      order._id = serialized.id;
      order._created_at = serialized.created_at;
      order._updated_at = serialized.updated_at;

      return order;
    }

    return undefined;
  }

  constructor(
    user_id,
    company_id,
    payment_id,
    delivery_day,
    total,
    description,
    items,
    status = OrderStatus.WAITING_APPROVAL()
  ) {
    super();

    this._user_id = user_id;
    this._company_id = company_id;
    this._payment_id = payment_id;
    this._delivery_day = delivery_day;
    this._total = total;
    this._description = description;
    this._items = items;
    this._status = status;
  }

  set status(status) {
    this._status = status;
  }

  set payment_id(id) {
    this._payment_id = id;
  }

  get items() {
    return this._items;
  }
}

module.exports = { Order, OrderStatus };
