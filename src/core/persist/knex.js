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
  OrderDetail,
} = require('../models');

function KnexPersist(db, class_, table) {
  return {
    async save(obj) {
      const is_update = obj.id && (await this.get(obj.id));
      if (is_update) {
        await this._update(obj.id, obj);
        return 'update';
      }

      await this._create(obj);
      return 'create';
    },

    async delete(obj_id) {
      return db(table).where('id', obj_id).del();
    },

    async deleteAll() {
      return db(table).del();
    },

    async get(obj_id) {
      return db(table).where('id', obj_id).first();
    },

    async getAll() {
      return db.select('*').from(table).orderBy('created_at', 'desc');
    },

    async first() {
      return db(table).first();
    },

    async _create(obj) {
      return db(table).insert(obj);
    },

    async _update(obj_id, obj) {
      return db(table)
        .where('id', obj_id)
        .update({
          ...obj,
          updated_at: new Date(),
        });
    },
  };
}

function UserKnexPersist(db) {
  return {
    ...KnexPersist(db, User, 'users'),
  };
}
function CompanyKnexPersist(db, persist = KnexPersist) {
  const table = 'companies';
  return {
    ...persist(db, Company, table),
    async find_cod(cod) {
      return db(table).where('cod', cod).first();
    },
  };
}
function ImageKnexPersist(db, persist = KnexPersist) {
  return {
    ...persist(db, Image, 'images'),
  };
}
function AddressKnexPersist(db, persist = KnexPersist) {
  return {
    ...persist(db, Address, 'addresses'),
  };
}
function RoleKnexPersist(db, persist = KnexPersist) {
  return {
    ...persist(db, Role, 'roles'),
  };
}
function ClientsCompaniesKnexPersist(db, persist = KnexPersist) {
  return {
    ...persist(db, ClientsCompanies, 'clients_companies'),
  };
}
function ProductKnexPersist(db, persist = KnexPersist) {
  return {
    ...persist(db, Product, 'products'),
  };
}
function ProductImagesKnexPersist(db, persist = KnexPersist) {
  return {
    ...persist(db, ProductImages, 'product_images'),
  };
}
function PaymentKnexPersist(db, persist = KnexPersist) {
  return {
    ...persist(db, Payment, 'payments'),
  };
}
function OrderDetailKnexPersist(db, persist = KnexPersist) {
  return {
    ...persist(db, OrderDetail, 'order_detail'),
  };
}
function OrderKnexPersist(db, persist = KnexPersist) {
  return {
    ...persist(db, Order, 'orders'),

    async _create(obj) {
      return db.transaction(async (trx) => {
        const { items, ...order } = obj;

        if (items.length) {
          const [order_data] = await trx('orders').insert(order, '*');
          await Promise.all(
            items.map(({ name, price, type, category, quantity }) =>
              trx('order_detail').insert(
                OrderDetail.serialize(
                  new OrderDetail(
                    order_data.id,
                    name,
                    price,
                    type,
                    category,
                    quantity
                  )
                ),
                '*'
              )
            )
          );
          return 'Order successfully created!';
        }

        throw Error('Missing order items!');
      });
    },
  };
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
  OrderDetailKnexPersist,
};
