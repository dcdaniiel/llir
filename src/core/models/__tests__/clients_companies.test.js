const {
  User,
  Company,
  ClientsCompanies,
  Role,
  RoleTypes,
} = require('../index');
const { PersistorProvider } = require('../../persist');

const available_days = {
  days: [{ day: new Date(), delivery_hour: { start: '8:00', end: '18:00' } }],
};

const _clean = async () => {
  const persistor = PersistorProvider.getPersistor();
  const user = persistor.getPersistInstance('User');
  const company = persistor.getPersistInstance('Company');
  const clients_companies = persistor.getPersistInstance('ClientsCompanies');

  await clients_companies.deleteAll();
  await company.deleteAll();
  await user.deleteAll();
};

beforeEach(async () => {
  await _clean();
});

describe('Client Companies', () => {
  it('constructor works', () => {
    const cp = new ClientsCompanies();
    expect(cp).toBeInstanceOf(ClientsCompanies);
  });

  it('create a client company relation', async () => {
    const user = await new User(
      'create_user',
      'cpf',
      'email',
      'phone',
      'PASSWD',
      new Date()
    ).save();

    const role = await new Role(RoleTypes.CLIENT()).save();

    const company = new Company(
      'company_name',
      'phone',
      available_days,
      user.id
    );
    company.cod = Company.cod_generator(company.name);

    await company.save();

    const cp = await new ClientsCompanies(role.id, user.id, company.id).save();

    expect(cp).toBeTruthy();

    const fetchCP = await ClientsCompanies.fetch(cp.id);

    expect(fetchCP.id).toBe(cp.id);
  });

  it('delete client company relation', async () => {
    const user = await new User(
      'create_user',
      'cpf',
      'email',
      'phone',
      'PASSWD',
      new Date()
    ).save();

    const role = await new Role(RoleTypes.CLIENT()).save();
    const company = await new Company(
      'company_name',
      'phone',
      available_days,
      user.id
    );

    company.cod = Company.cod_generator(company.name);

    await company.save();

    const cp = await new ClientsCompanies(role.id, user.id, company.id).save();

    expect(cp).toBeTruthy();

    const fetchCP = await ClientsCompanies.fetch(cp.id);

    expect(fetchCP.id).toBe(cp.id);

    await ClientsCompanies.delete(cp.id);

    const ft = await ClientsCompanies.fetch(cp.id);

    expect(ft).toBeFalsy();
  });
});
