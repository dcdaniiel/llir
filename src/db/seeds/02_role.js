const { Role, RoleTypes } = require('../../core/models');

const role = (type) => Role.serialize(new Role(type));

exports.seed = (knex) => {
  return knex('roles')
    .del()
    .then(() =>
      knex('roles').insert([
        role(RoleTypes.CLIENT()),
        role(RoleTypes.FUNCTIONARY()),
        role(RoleTypes.ADMIN()),
        role('SYS_ADMIN'),
      ])
    );
};
