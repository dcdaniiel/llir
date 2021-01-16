const bcryptjs = require('bcryptjs');
const { emitter } = require('../../utils');
const {
  User,
  Category,
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
  UserAuth,
  AuthClaims,
  OrderStatus,
} = require('../models');

const {
  getClaimsByClientCompanyID,
  selectProductsByIds,
} = require('../../api/helpers/sql');

const permissions = async (db, trx, role, claims, user_id, company_id) => {
  const [roleData] = await Role.findBy({ role });

  const [client_company_id] = await trx('clients_companies').insert(
    ClientsCompanies.serialize(
      new ClientsCompanies(roleData.id, user_id, company_id)
    ),
    'id'
  );

  return Promise.all(
    claims.map(({ _id }) =>
      trx('user_auth').insert(
        UserAuth.serialize(new UserAuth(client_company_id, _id))
      )
    )
  );
};

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

    async findBy(where) {
      return db(table).where(where);
    },

    async getAll(order_by = 'desc') {
      return db.select('*').from(table).orderBy('created_at', order_by);
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

    async raw(query) {
      return db.raw(query);
    },
  };
}

function UserKnexPersist(db) {
  return {
    ...KnexPersist(db, User, 'users'),
    async _create(obj) {
      const password = await bcryptjs.hash(obj.salt + obj.password, 10);

      return db('users').insert({ ...obj, password });
    },
  };
}
function CompanyKnexPersist(db) {
  const table = 'companies';
  return {
    ...KnexPersist(db, Company, table),

    async _create(obj) {
      // eslint-disable-next-line no-unused-vars
      const { token, ...company } = obj;

      return db.transaction(async (trx) => {
        const claims = await AuthClaims.getAll();
        const [company_id] = await db('companies').insert(company, 'id');

        return permissions(db, trx, 'admin', claims, obj.user_id, company_id);
      });
    },

    async trx_client(obj) {
      return db.transaction(async (trx) => {
        const client_claims = [
          'may_manager_profile',
          'may_manager_order',
          'authenticated',
        ];
        const claim = (await AuthClaims.getAll()).filter(({ _claim }) =>
          client_claims.includes(_claim)
        );

        return permissions(
          db,
          trx,
          'client',
          claim,
          obj.user_id,
          obj.company_id
        );
      });
    },
  };
}
function ImageKnexPersist(db) {
  return {
    ...KnexPersist(db, Image, 'images'),
  };
}
function AddressKnexPersist(db) {
  return {
    ...KnexPersist(db, Address, 'addresses'),
  };
}
function RoleKnexPersist(db) {
  return {
    ...KnexPersist(db, Role, 'roles'),
  };
}
function ClientsCompaniesKnexPersist(db) {
  return {
    ...KnexPersist(db, ClientsCompanies, 'clients_companies'),
  };
}
function ProductKnexPersist(db) {
  return {
    ...KnexPersist(db, Product, 'products'),
  };
}
function ProductImagesKnexPersist(db) {
  return {
    ...KnexPersist(db, ProductImages, 'product_images'),
  };
}
function PaymentKnexPersist(db) {
  return {
    ...KnexPersist(db, Payment, 'payments'),
  };
}
function OrderDetailKnexPersist(db) {
  return {
    ...KnexPersist(db, OrderDetail, 'order_detail'),
  };
}
function OrderKnexPersist(db) {
  return {
    ...KnexPersist(db, Order, 'orders'),

    async _create(obj) {
      return db.transaction(async (trx) => {
        const { items, ...order } = obj;

        if (items.length) {
          const ids = items.map(({ id }) => id);

          const { rows: products } = await Product.raw(
            selectProductsByIds(ids)
          );

          if (!products.length) {
            return {
              statusCode: 404,
              data: { message: 'Invalid products id!' },
            };
          }

          const validated_product = products.map((product) => {
            const { quantity } = items.find((item) => item.id === product.id);
            return {
              ...product,
              quantity,
              total: product.price * quantity,
            };
          });

          const total = validated_product.reduce((a, n) => a + n.total, 0);

          const [order_data] = await trx('orders').insert(
            { ...order, total },
            '*'
          );

          const detail = await Promise.all(
            validated_product.map(async ({ name, price, type, quantity }) =>
              trx('order_detail').insert(
                OrderDetail.serialize(
                  new OrderDetail(order_data.id, name, price, type, quantity)
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
function CategoryKnexPersist(db) {
  return {
    ...KnexPersist(db, Category, 'categories'),
  };
}
function AuthClaimsKnexPersist(db) {
  return {
    ...KnexPersist(db, AuthClaims, 'auth_claims'),
  };
}
function UserAuthKnexPersist(db) {
  return {
    ...KnexPersist(db, UserAuth, 'user_auth'),
    async getAuth(user_id) {
      const client_company = await ClientsCompanies.findBy({ user_id });

      return Promise.all(
        client_company.map(async ({ _id, _role_id, _company_id }) => {
          const userClaim = await User.raw(getClaimsByClientCompanyID(_id));
          const claims = userClaim.rows.map(({ claim }) => claim);

          return {
            company: Company.serialize(await Company.fetch(_company_id)),
            role: (await Role.fetch(_role_id))._role,
            claims,
          };
        })
      );
    },
  };
}

module.exports = {
  UserKnexPersist,
  CategoryKnexPersist,
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
  AuthClaimsKnexPersist,
  UserAuthKnexPersist,
};
