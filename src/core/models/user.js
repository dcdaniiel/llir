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
      email_confirmed: obj._email_confirmed,
      salt: obj._salt,
      phone: obj._phone,
      password: obj._password,
      birthdate: obj._birthdate,
      cod: obj._cod,
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
        serialized.birthdate,
        serialized.cod
      );

      user._id = serialized.id;
      user._salt = serialized.salt;
      user._email_confirmed = serialized.email_confirmed;
      user._created_at = serialized.created_at;
      user._updated_at = serialized.updated_at;

      return user;
    }

    return undefined;
  }

  constructor(name, cpf, email, phone, password, birthdate, cod) {
    super();

    this._name = name;
    this._cpf = cpf;
    this._email = email;
    this._phone = phone;
    this._password = password;
    this._birthdate = birthdate;
    this._avatar_id = null;
    this._salt = this._makeSalt();
    this._cod = cod;
  }

  _makeSalt() {
    const length = Math.floor(Math.random() * 50);
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%?';
    const charactersLength = characters.length;

    return Array(length)
      .fill('')
      .reduce(
        (acc, _) =>
          acc + characters.charAt(Math.floor(Math.random() * charactersLength)),
        ''
      );
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

  get email_confirmed() {
    return this._email_confirmed;
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

  set email_confirmed(bool) {
    this._email_confirmed = bool;
  }

  set phone(phone) {
    this._phone = phone;
  }
}

module.exports = { User };
