const { PersistedEntity } = require('./base');

class Payment extends PersistedEntity {
  static getEntityClass() {
    return Payment;
  }

  static serialize(obj) {
    return {
      id: obj._id,
      company_id: obj._company_id,
      payment_type: obj._payment_type,
      enabled: obj._enabled,
      created_at: obj._created_at,
      updated_at: obj._updated_at,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const payment = new Payment(
        serialized.company_id,
        serialized.payment_type,
        serialized.description,
        serialized.enabled
      );

      payment._id = serialized.id;
      payment._created_at = serialized.created_at;
      payment._updated_at = serialized.updated_at;

      return payment;
    }

    return undefined;
  }

  constructor(company_id, payment_type, description, enabled = false) {
    super();

    this._company_id = company_id;
    this._payment_type = payment_type;
    this._description = description;
    this._enabled = enabled;
  }

  set payment_type(payment_type) {
    this._payment_type = payment_type;
  }

  get payment_type() {
    return this._payment_type;
  }

  set description(description) {
    this._description = description;
  }

  get description() {
    return this._description;
  }

  set enabled(enabled) {
    this._enabled = enabled;
  }

  get enabled() {
    return this._enabled;
  }
}

module.exports = { Payment };
