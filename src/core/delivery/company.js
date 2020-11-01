const Ajv = require('ajv');
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
  }

  validate_days(obj) {
    const schemaValidator = Ajv();

    const schema = {
      properties: {
        days: {
          type: 'array',
          items: {
            type: 'object',
            items: {
              properties: {
                day: {
                  type: 'string',
                  format: 'date',
                },
                delivery_hour: {
                  type: 'object',
                  items: {
                    properties: {
                      day: {
                        type: 'string',
                      },
                      delivery_hour: {
                        type: 'object',
                        items: {
                          properties: {
                            start: {
                              type: 'string',
                            },
                            end: {
                              type: 'string',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    const validator = schemaValidator.compile(schema);

    const valid = validator(obj);

    return valid ? JSON.stringify(obj) : null;
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
