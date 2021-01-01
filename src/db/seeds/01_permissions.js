const { AuthClaims } = require('../../core/models');

const auth_claim = (module, claim) =>
  AuthClaims.serialize(new AuthClaims(module, claim));

exports.seed = (knex) => {
  return knex('auth_claims')
    .del()
    .then(() =>
      knex('auth_claims').insert([
        auth_claim('authenticated', 'authenticated'),
        auth_claim('user', 'may_manager_user'),
        auth_claim('product', 'may_manager_product'),
        auth_claim('order', 'may_manager_order'),
        auth_claim('category', 'may_manager_category'),
        auth_claim('payment', 'may_manager_payment'),
        auth_claim('image', 'may_manager_image'),
      ])
    );
};
