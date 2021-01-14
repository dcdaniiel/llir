const { v1: uuid } = require('uuid');
const { PersistorSingleton } = require('../persist/persist');

class BaseEntity {
  static serialize(instance) {
    throw Error('Subclass and implement');
  }

  static deserialize(serialized) {
    throw Error('Subclass and implement');
  }

  static raw(query) {
    return this.getPersist().raw(query);
  }

  constructor() {
    this._id = uuid();
    this._created_at = new Date();
    this._updated_at = new Date();
  }

  get id() {
    return this._id;
  }

  get created_at() {
    return this._id;
  }

  serialize() {
    return this.constructor.serialize(this);
  }
}

class PersistedEntity extends BaseEntity {
  static getEntityClass() {
    throw Error('Subclass and implement');
  }

  static getPersist() {
    return new PersistorSingleton().getPersistInstance(
      this.getEntityClass().name
    );
  }

  static async fetch(...args) {
    const serialized = await this.getPersist().get(...args);
    return this.deserialize(serialized);
  }

  static async findBy(where) {
    const serialized = await this.getPersist().findBy(where);
    return serialized.map((item) => this.deserialize(item));
  }

  static async getAll() {
    const serialized = await this.getPersist().getAll();
    return serialized.map((i) => this.deserialize(i));
  }

  static async delete(...args) {
    return this.getPersist().delete(...args);
  }

  static async deleteAll() {
    return this.getPersist().deleteAll();
  }

  constructor() {
    super();
  }

  getPersist() {
    return this.constructor.getPersist();
  }

  async save(...args) {
    await this.getPersist().save(this.serialize(), ...args);
    return this;
  }
}

module.exports = { PersistedEntity };
