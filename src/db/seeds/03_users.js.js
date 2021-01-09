const { User, Company } = require('../../core/models');

const user = (name, cpf, email, phone, password, birthdate) =>
  User.serialize(new User(name, cpf, email, phone, password, birthdate));

const rootCompany = (name, phone, available_days, user_id, avatar_id) =>
  Company.serialize(
    new Company(name, phone, available_days, user_id, avatar_id)
  );

exports.seed = async (knex) => {
  await knex('users').del();
  await knex('companies').insert(rootCompany('Root company', '15996578545'));
  return knex('users')
    .del()
    .then(() => {
      knex('users').insert([
        user(
          'Daniel Teixeira',
          '43477788800',
          'dc.daniiel@gmail.com',
          '15996578545',
          '123456',
          '1996-07-19T23:29:14.632Z'
        ),
      ]);
    });
};
