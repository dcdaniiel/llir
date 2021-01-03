const bcryptjs = require('bcryptjs');
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
  };
}

function UserKnexPersist(db) {
  return {
    ...KnexPersist(db, User, 'users'),
    async _create(obj) {
      const password = await bcryptjs.hash(obj.salt + obj.password, 10);

      return db.transaction(async (trx) => {
        const { cod, ...user } = obj;
        const [userData] = await trx('users').insert(
          { ...user, password },
          '*'
        );

        if (cod) {
          const [company] = await Company.findBy({ cod });
          if (company) {
            const [role] = await Role.findBy({ role: 'client' });
            const [client_company_id] = await trx('clients_companies').insert(
              ClientsCompanies.serialize(
                new ClientsCompanies(role.id, userData.id, company.id)
              ),
              'id'
            );
            const client_claims = [
              'authenticated',
              'may_manager_profile',
              'may_manager_order',
            ];
            const permissions = (
              await AuthClaims.getAll()
            ).filter(({ _claim }) => client_claims.includes(_claim));

            await Promise.all(
              permissions.map((claim) =>
                trx('user_auth').insert(
                  UserAuth.serialize(new UserAuth(client_company_id, claim.id))
                )
              )
            );
          }
        }

        return 'User created successfully!';
      });
    },
  };
}
function CompanyKnexPersist(db) {
  const table = 'companies';
  return {
    ...KnexPersist(db, Company, table),
    async find_cod(cod) {
      return db(table).where('cod', cod).first();
    },
    async _create(obj) {
      return db.transaction(async (trx) => {
        const [company_id] = await trx('companies').insert(obj, 'id');
        const [role] = await Role.findBy({ role: 'admin' });
        const [client_company_id] = await trx('clients_companies').insert(
          ClientsCompanies.serialize(
            new ClientsCompanies(role.id, obj.user_id, company_id)
          ),
          'id'
        );
        const permissions = await AuthClaims.getAll();
        await Promise.all(
          permissions.map((claim) =>
            trx('user_auth').insert(
              UserAuth.serialize(new UserAuth(client_company_id, claim.id))
            )
          )
        );

        return 'Company created successfully!';
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
          const [order_data] = await trx('orders').insert(order, '*');
          await Promise.all(
            items.map((item) => {
              return trx('order_detail').insert(
                OrderDetail.serialize(
                  new OrderDetail(
                    order_data.id,
                    item._name,
                    item._price,
                    item._type,
                    item._quantity
                  )
                ),
                '*'
              );
            })
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
        client_company.map(async ({ _id, _role_id, _company_id }) => ({
          company: Company.serialize(await Company.fetch(_company_id)),
          role: (await Role.fetch(_role_id))._role,
          claims: await Promise.all(
            (await UserAuth.findBy({ client_company: _id })).map(
              async ({ _auth_claim }) => {
                const { claim } = await AuthClaims.fetch(_auth_claim);

                return claim;
              }
            )
          ),
        }))
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
