const { PersistedEntity } = require('./base');

class AuthClaims extends PersistedEntity {
  static getEntityClass() {
    return AuthClaims;
  }

  static serialize(obj) {
    return {
      id: obj._id,
      module: obj._module,
      claim: obj._claim,
      created_at: obj._created_at,
      updated_at: obj._updated_at,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const auth = new AuthClaims(serialized.module, serialized.claim);

      auth._id = serialized.id;
      auth._created_at = serialized.created_at;
      auth._updated_at = serialized.updated_at;

      return auth;
    }

    return undefined;
  }

  constructor(module, claim) {
    super();

    this._module = module;
    this._claim = claim;
  }

  get claim() {
    return this._claim;
  }

  get module() {
    return this._module;
  }
}

module.exports = { AuthClaims };
