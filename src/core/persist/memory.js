const _ = require('lodash');
const assert = require('assert');

class MemoryPersist {
  constructor(class_) {
    this._store = {};
    this._class = class_;
  }

  async save(obj) {
    if (obj.id in this._store) {
      await this._update(obj.id, obj);
      return 'update';
    }
    await this._create(obj);
    return 'create';
  }

  async get(obj_id) {
    return this._store[obj_id];
  }

  async getAll() {
    return Object.values(this._store);
  }

  async first() {
    const first = await this.getAll();
    return first[0];
  }

  async delete(obj_id) {
    const ret = this._store[obj_id] ? 1 : 0;
    delete this._store[obj_id];
    return ret;
  }

  async deleteAll() {
    const ret = _.keys(this._store).length;

    this._store = {};
    return ret;
  }

  async _create(obj) {
    this._store[obj.id] = _.cloneDeep(obj);
  }

  async _update(obj_id, obj) {
    assert(obj_id in this._store);
    this._store[obj_id] = _.cloneDeep(obj);
  }
}

module.exports = { MemoryPersist };
