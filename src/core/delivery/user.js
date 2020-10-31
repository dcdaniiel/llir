const { PersistedEntity } = require('./base');

class User extends PersistedEntity {
  static getEntityClass() {
    return User;
  }

  static serialize(activity) {
    return {
      id: activity._id,
      created_at: activity._created_at,
      updated_at: activity._updated_at,
      name: activity._name,
      email: activity._email,
      phone: activity._phone,
      password: activity._password,
      birthdate: activity._birthdate,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const user = new User(
        serialized.name,
        serialized.email,
        serialized.phone,
        serialized.password,
        serialized.birthdate
      );

      user._id = serialized.id;
      user._created_at = serialized.created_at;
      user._updated_at = serialized.updated_at;

      return user;
    }

    return undefined;
  }

  constructor(name, email, phone, birthdate, password) {
    super();

    this._name = name;
    this._email = email;
    this._phone = phone;
    this._birthdate = birthdate;
    this._password = password;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get phone() {
    return this._phone;
  }
}

module.exports = { User };
