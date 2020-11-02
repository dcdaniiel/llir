const { Company, User } = require('../index');
const { PersistorProvider } = require('../../persist');
const { persist_options } = require('../../settings');

const available_days = {
  days: [
    { day: new Date(), delivery_hour: { start: '8:00', end: '18:00' } },
    { day: new Date(), delivery_hour: { start: '9:00', end: '17:00' } },
    { day: new Date(), delivery_hour: { start: '8:00', end: '17:00' } },
  ],
};

const _clean = async () => {
  const persistor = PersistorProvider.getPersistor(...persist_options);
  const company = persistor.getPersistInstance('Company');
  const user = persistor.getPersistInstance('User');

  await company.deleteAll();
  await user.deleteAll();
};

beforeEach(async () => {
  await _clean();
});

describe('Company', () => {
  it('constructor works', () => {
    const company = new Company('');
    expect(company).toBeInstanceOf(Company);
  });

  it('create a company', async () => {
    const user = await new User(
      'user_test',
      'cpf',
      'e@asd.com',
      '15123123',
      'PASSWD',
      new Date()
    ).save();

    const company = new Company(
      'company_name',
      'phone',
      available_days,
      user.id
    );

    const data = await company.save(
      'company_name',
      'phone',
      available_days,
      user.id
    );

    expect(data.id).toBe(company.id);
  });

  it('update company', async () => {
    const user = await new User(
      'create_user',
      'cpf',
      'email',
      'phone',
      'PASSWD',
      new Date()
    ).save();

    const company = await new Company(
      'company_name',
      'phone',
      available_days,
      user.id
    ).save();

    const fetchCompany = await Company.fetch(company.id);
    fetchCompany.name = 'update_name';
    fetchCompany.save();

    expect(company.name).not.toEqual(fetchCompany.name);
  });

  it('delete company', async () => {
    const user = await new User(
      'user_test',
      'cpf',
      'e@asd.com',
      '15123123',
      'PASSWD',
      new Date()
    ).save();

    const company = await new Company(
      'company_name',
      'phone',
      available_days,
      user.id
    ).save();

    const fetchCompany = await Company.fetch(company.id);

    expect(company.id).toBe(fetchCompany.id);

    await Company.delete(company.id);

    const fetchDel = await Company.fetch(company.id);

    expect(fetchDel).toBeFalsy();
  });
});
