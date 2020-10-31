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

  constructor(name, email, phone, password, birthdate) {
    super();

    this._name = name;
    this._email = email;
    this._phone = phone;
    this._password = password;
    this._birthdate = birthdate;
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

  set name(name) {
    this._name = name;
  }

  set email(email) {
    this._email = email;
  }

  set phone(phone) {
    this._phone = phone;
  }
}

module.exports = { User };
