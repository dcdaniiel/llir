const { User, Company } = require('../delivery');

class KnexPersist {
  constructor(db, class_, table) {
    this._db = db;
    this._class = class_;
    this._table = table;
  }

  async save(obj) {
    const is_update = obj.id && (await this.get(obj.id));
    if (is_update) {
      await this._update(obj.id, obj);
      return 'update';
    }

    await this._create(obj);
    return 'create';
  }

  async delete(obj_id) {
    return this._db(this._table).where('id', obj_id).del();
  }

  async deleteAll() {
    return this._db(this._table).del();
  }

  async get(obj_id) {
    return this._db(this._table).where('id', obj_id).first();
  }

  async getAll() {
    return this._db.select('*').from(this._table).orderBy('created_at', 'desc');
  }

  async first() {
    return this._db(this._table).first();
  }

  async _create(obj) {
    return this._db(this._table).insert(obj);
  }

  async _update(obj_id, obj) {
    return this._db(this._table).where('id', obj_id).update(obj);
  }
}

class UserKnexPersist extends KnexPersist {
  constructor(db) {
    super(db, User, 'users');
  }
}

class CompanyKnexPersist extends KnexPersist {
  constructor(db) {
    super(db, Company, 'companies');
  }
}

module.exports = { UserKnexPersist, CompanyKnexPersist };
