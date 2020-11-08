const { PersistedEntity } = require('./base');

class User extends PersistedEntity {
  static getEntityClass() {
    return User;
  }

  static serialize(obj) {
    return {
      id: obj._id,
      created_at: obj._created_at,
      updated_at: obj._updated_at,
      name: obj._name,
      cpf: obj._cpf,
      email: obj._email,
      phone: obj._phone,
      password: obj._password,
      birthdate: obj._birthdate,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const user = new User(
        serialized.name,
        serialized.cpf,
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

  constructor(name, cpf, email, phone, password, birthdate) {
    super();

    this._name = name;
    this._cpf = cpf;
    this._email = email;
    this._phone = phone;
    this._password = password;
    this._birthdate = birthdate;
    this._avatar_id = null;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get cpf() {
    return this._cpf;
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

  set cpf(cpf) {
    this._cpf = cpf;
  }

  set email(email) {
    this._email = email;
  }

  set avatar_id(id) {
    this._avatar_id = id;
  }

  set phone(phone) {
    this._phone = phone;
  }
}

module.exports = { User };
