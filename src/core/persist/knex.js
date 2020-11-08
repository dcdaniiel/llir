const {
  User,
  Company,
  Image,
  Address,
  Role,
  ClientsCompanies,
  Product,
  ProductImages,
  Payment,
  Order,
} = require('../models');

class KnexPersist {
  constructor(db, class_, table) {
    this._db = db;
    this._class = class_;
    this._table = table;
  }

  async save(obj) {
    const is_update = obj.id && (await this.get(obj.id));
    if (is_update) {
      await this._update(obj.id, obj);
      return 'update';
    }

    await this._create(obj);
    return 'create';
  }

  async delete(obj_id) {
    return this._db(this._table).where('id', obj_id).del();
  }

  async deleteAll() {
    return this._db(this._table).del();
  }

  async get(obj_id) {
    return this._db(this._table).where('id', obj_id).first();
  }

  async getAll() {
    return this._db.select('*').from(this._table).orderBy('created_at', 'desc');
  }

  async first() {
    return this._db(this._table).first();
  }

  async _create(obj) {
    return this._db(this._table).insert(obj);
  }

  async _update(obj_id, obj) {
    return this._db(this._table).where('id', obj_id).update(obj);
  }
}

class UserKnexPersist extends KnexPersist {
  constructor(db) {
    super(db, User, 'users');
  }
}

class CompanyKnexPersist extends KnexPersist {
  constructor(db) {
    super(db, Company, 'companies');
  }

  async find_cod(cod) {
    return this._db(this._table).where('cod', cod).first();
  }
}

class ImageKnexPersist extends KnexPersist {
  constructor(db) {
    super(db, Image, 'images');
  }
}

class AddressKnexPersist extends KnexPersist {
  constructor(db) {
    super(db, Address, 'addresses');
  }
}

class RoleKnexPersist extends KnexPersist {
  constructor(db) {
    super(db, Role, 'roles');
  }
}

class ClientsCompaniesKnexPersist extends KnexPersist {
  constructor(db) {
    super(db, ClientsCompanies, 'clients_companies');
  }
}

class ProductKnexPersist extends KnexPersist {
  constructor(db) {
    super(db, Product, 'products');
  }
}

class ProductImagesKnexPersist extends KnexPersist {
  constructor(db) {
    super(db, ProductImages, 'product_images');
  }
}

class PaymentKnexPersist extends KnexPersist {
  constructor(db) {
    super(db, Payment, 'payments');
  }
}

class OrderKnexPersist extends KnexPersist {
  constructor(db) {
    super(db, Order, 'orders');
  }
}

module.exports = {
  UserKnexPersist,
  CompanyKnexPersist,
  ImageKnexPersist,
  AddressKnexPersist,
  RoleKnexPersist,
  ClientsCompaniesKnexPersist,
  ProductKnexPersist,
  ProductImagesKnexPersist,
  PaymentKnexPersist,
  OrderKnexPersist,
};
