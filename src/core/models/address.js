const { PersistedEntity } = require('./base');

class Address extends PersistedEntity {
  static getEntityClass() {
    return Address;
  }

  static serialize(obj) {
    return {
      id: obj._id,
      user_id: obj._user_id,
      company_id: obj._company_id,
      street: obj._street,
      number: obj._number,
      city: obj._city,
      state: obj._state,
      country: obj._country,
      zipcode: obj._zipcode,
      district: obj._district,
      description: obj._description,
      created_at: obj._created_at,
      updated_at: obj._updated_at,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const address = new Address(
        serialized.street,
        serialized.number,
        serialized.city,
        serialized.state,
        serialized.country,
        serialized.zipcode,
        serialized.district,
        serialized.description,
        serialized.user_id,
        serialized.company_id
      );

      address._id = serialized.id;
      address._created_at = serialized.created_at;
      address._updated_at = serialized.updated_at;

      return address;
    }

    return undefined;
  }

  constructor(
    street,
    number,
    city,
    state,
    country,
    zipcode,
    district,
    description,
    user_id,
    company_id
  ) {
    super();

    this._street = street;
    this._number = number;
    this._city = city;
    this._state = state;
    this._country = country;
    this._zipcode = zipcode;
    this._district = district;
    this._description = description;
    this._user_id = user_id;
    this._company_id = company_id;
  }

  set street(street) {
    this._street = street;
  }

  set state(state) {
    this._state = state;
  }

  set country(country) {
    this._country = country;
  }

  set zipcode(zipcode) {
    this._zipcode = zipcode;
  }

  set number(number) {
    this._number = number;
  }

  set city(city) {
    this._city = city;
  }

  set district(district) {
    this._district = district;
  }

  set description(description) {
    this._description = description;
  }

  set user_id(id) {
    this._user_id = id;
  }

  set company_id(id) {
    this._company_id = id;
  }

  get user_id() {
    return this._user_id;
  }

  get state() {
    return this._state;
  }

  get country() {
    return this._country;
  }

  get zipcode() {
    return this._zipcode;
  }

  get company_id() {
    return this._company_id;
  }

  get street() {
    return this._street;
  }

  get number() {
    return this._number;
  }

  get city() {
    return this._city;
  }

  get district() {
    return this._district;
  }

  get description() {
    return this._description;
  }
}

module.exports = { Address };
