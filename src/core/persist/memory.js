const _ = require('lodash');
const assert = require('assert');
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

function MemoryPersist(class_) {
  let store = {};
  return {
    async save(obj) {
      if (obj.id in store) {
        await this._update(obj.id, obj);
        return 'update';
      }
      await this._create(obj);
      return 'create';
    },

    async get(obj_id) {
      return store[obj_id];
    },

    async getAll() {
      return Object.values(store);
    },

    async first() {
      const first = await this.getAll();
      return first[0];
    },

    async delete(obj_id) {
      const ret = store[obj_id] ? 1 : 0;
      delete store[obj_id];
      return ret;
    },

    async deleteAll() {
      const ret = _.keys(store).length;

      store = {};
      return ret;
    },

    async _create(obj) {
      store[obj.id] = _.cloneDeep(obj);
    },

    async _update(obj_id, obj) {
      assert(obj_id in store);
      store[obj_id] = _.cloneDeep(obj);
    },
  };
}

function UsersMemoryPersist(persist = MemoryPersist) {
  return {
    ...persist(User),
  };
}

function CompanyMemoryPersist(persist = MemoryPersist) {
  return {
    ...persist(Company),
  };
}

function ImageMemoryPersist(persist = MemoryPersist) {
  return {
    ...persist(Image),
  };
}

function AddressMemoryPersist(persist = MemoryPersist) {
  return {
    ...persist(Address),
  };
}

function RoleMemoryPersist(persist = MemoryPersist) {
  return {
    ...persist(Role),
  };
}

function ClientsCompaniesMemoryPersist(persist = MemoryPersist) {
  return {
    ...persist(ClientsCompanies),
  };
}

function ProductMemoryPersist(persist = MemoryPersist) {
  return {
    ...persist(Product),
  };
}

function ProductImagesMemoryPersist(persist = MemoryPersist) {
  return {
    ...persist(ProductImages),
  };
}

function PaymentMemoryPersist(persist = MemoryPersist) {
  return {
    ...persist(Payment),
  };
}

function OrderDetailMemoryPersist(persist = MemoryPersist) {
  return {
    ...persist(OrderDetail),
  };
}

function OrderMemoryPersist(persist = MemoryPersist) {
  const orderInstance = persist(Order);
  return {
    ...orderInstance,
    async _create(obj) {
      const { items, ...order } = obj;

      if (items.length) {
        const [order_data] = await orderInstance.save(order);
        await Promise.all(
          items.map(async ({ name, price, type, category, quantity }) => {
            await OrderDetailMemoryPersist().save(
              OrderDetail.serialize(
                new OrderDetail(
                  order_data.id,
                  name,
                  price,
                  type,
                  category,
                  quantity
                )
              )
            );
          })
        );
        return 'Order successfully created!';
      }

      throw Error('Missing order items!');
    },
  };
}

module.exports = {
  UsersMemoryPersist,
  CompanyMemoryPersist,
  ImageMemoryPersist,
  AddressMemoryPersist,
  RoleMemoryPersist,
  ClientsCompaniesMemoryPersist,
  ProductMemoryPersist,
  ProductImagesMemoryPersist,
  PaymentMemoryPersist,
  OrderMemoryPersist,
  OrderDetailMemoryPersist,
};
