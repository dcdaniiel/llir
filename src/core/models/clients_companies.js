const { PersistedEntity } = require('./base');

class ClientsCompanies extends PersistedEntity {
  static getEntityClass() {
    return ClientsCompanies;
  }

  static serialize(obj) {
    return {
      id: obj._id,
      role_id: obj._role_id,
      user_id: obj._user_id,
      company_id: obj._company_id,
      created_at: obj._created_at,
      updated_at: obj._updated_at,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const cp = new ClientsCompanies(
        serialized.role_id,
        serialized.user_id,
        serialized.company_id
      );

      cp._id = serialized.id;
      cp._created_at = serialized.created_at;
      cp._updated_at = serialized.updated_at;

      return cp;
    }

    return undefined;
  }

  constructor(role_id, user_id, company_id) {
    super();

    this._role_id = role_id;
    this._user_id = user_id;
    this._company_id = company_id;
  }

  set role_id(id) {
    this._role_id = id;
  }

  set user_id(id) {
    this._user_id = id;
  }

  set company_id(id) {
    this._company_id = id;
  }

  get role_id() {
    return this._role_id;
  }

  get user_id() {
    return this._user_id;
  }

  get company_id() {
    return this._company_id;
  }
}

module.exports = { ClientsCompanies };
