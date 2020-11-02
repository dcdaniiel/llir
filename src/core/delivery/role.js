const { PersistedEntity } = require('./base');

class RoleTypes {
  static CLIENT() {
    return 'client';
  }

  static FUNCTIONARY() {
    return 'functionary';
  }

  static ADMIN() {
    return 'admin';
  }
}

class Role extends PersistedEntity {
  static getEntityClass() {
    return Role;
  }

  static serialize(obj) {
    return {
      id: obj._id,
      role: obj._role,
      created_at: obj._created_at,
      updated_at: obj._updated_at,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const role = new Role(serialized.role);

      role._id = serialized.id;
      role._created_at = serialized.created_at;
      role._updated_at = serialized.updated_at;

      return role;
    }

    return undefined;
  }

  constructor(role) {
    super();

    this._role = role;
  }

  set role(role) {
    this._role = role;
  }

  get role() {
    return this._role;
  }
}

module.exports = { Role, RoleTypes };
