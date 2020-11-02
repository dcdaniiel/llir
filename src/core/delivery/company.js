const Ajv = require('ajv');
const { format } = require('date-fns');
const { PersistedEntity } = require('./base');

class Company extends PersistedEntity {
  static getEntityClass() {
    return Company;
  }

  static serialize(obj) {
    return {
      id: obj._id,
      user_id: obj._user_id,
      avatar_id: obj._avatar_id,
      name: obj._name,
      phone: obj._phone,
      cod: obj._cod,
      available_days: obj._available_days,
      created_at: obj._created_at,
      updated_at: obj._updated_at,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const company = new Company(
        serialized.name,
        serialized.phone,
        serialized.available_days,
        serialized.user_id,
        serialized.avatar_id
      );

      company._id = serialized.id;
      company._cod = serialized.cod;
      company._created_at = serialized.created_at;
      company._updated_at = serialized.updated_at;

      return company;
    }
    return undefined;
  }

  constructor(name, phone, available_days, user_id, avatar_id) {
    super();

    this._name = name;
    this._phone = phone;
    this._available_days = this.validate_days(available_days);
    this._user_id = user_id;
    this._avatar_id = avatar_id;
    this._cod = null;
  }

  static cod_generator(word) {
    const random_int = (word_max) => {
      const min = Math.ceil(2);
      const max = Math.floor(word_max);
      return Math.floor(Math.random() * (max - min)) + min;
    };
    const date = new Date();
    const millisecond = format(date, 'SSS');
    const letter = word.charAt(
      Math.ceil(word.length / random_int(word.length))
    );
    const divMilli = Math.ceil(millisecond / random_int(word.length) + 2);

    return `${millisecond}${word.substring(0, 2)}${divMilli}${word.substring(
      word.length - 1,
      word.length
    )}${letter === '' ? word.charAt(0) : letter}`
      .toUpperCase()
      .trim();
  }

  set cod(cod) {
    this._cod = cod;
  }

  validate_days(obj) {
    const schemaValidator = Ajv();

    const schema = {
      type: 'object',
      properties: {
        days: {
          type: 'array',
          items: {
            type: 'object',
          },
        },
      },
    };

    const validator = schemaValidator.compile(schema);

    const valid = validator(obj);

    return valid ? obj : null;
  }

  set user_id(id) {
    this._user_id = id;
  }

  set avatar_id(id) {
    this._avatar_id = id;
  }

  set available_days(available_days) {
    this._available_days = this.validate_days(available_days);
  }

  set phone(phone) {
    this._phone = phone;
  }

  set name(name) {
    this._name = name;
  }

  get cod() {
    return this._cod;
  }

  get name() {
    return this._name;
  }

  get phone() {
    return this._phone;
  }

  get available_days() {
    return this._available_days;
  }
}

module.exports = { Company };
