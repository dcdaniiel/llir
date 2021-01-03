const { PersistedEntity } = require('./base');

class UserAuth extends PersistedEntity {
  static getEntityClass() {
    return UserAuth;
  }

  static serialize(obj) {
    return {
      id: obj._id,
      client_company: obj._client_company,
      auth_claim: obj._auth_claim,
      created_at: obj._created_at,
      updated_at: obj._updated_at,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const user_auth = new UserAuth(
        serialized.client_company,
        serialized.auth_claim
      );

      user_auth._id = serialized.id;
      user_auth._created_at = serialized.created_at;
      user_auth._updated_at = serialized.updated_at;

      return user_auth;
    }
    return undefined;
  }

  constructor(client_company, auth_claim) {
    super();

    this._client_company = client_company;
    this._auth_claim = auth_claim;
  }

  static async getAuth(user_id) {
    return this.getPersist().getAuth(user_id);
  }
}

module.exports = { UserAuth };
