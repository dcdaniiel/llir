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
      'cpf1',
      'e@as2d.com',
      '151232123',
      'PASSWD',
      new Date()
    ).save();

    const comp1 = await new Company(
      'Lia fruit',
      'phone',
      available_days,
      user.id
    );
    comp1.cod = Company.cod_generator(comp1.name);
    await comp1.save();

    const comp2 = new Company('Lima fruit', 'phone', available_days, user.id);

    comp2.cod = Company.cod_generator(comp2.name);

    const data = await comp2.save();

    expect(data.id).toBe(comp2.id);
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

    const company = new Company(
      'company_name',
      'phone',
      available_days,
      user.id
    );
    company.cod = Company.cod_generator(company.name);

    await company.save();

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

    const company = new Company('lima', 'phone', available_days, user.id);
    company.cod = Company.cod_generator(company.name);

    await company.save();

    const fetchCompany = await Company.fetch(company.id);

    expect(company.id).toBe(fetchCompany.id);

    await Company.delete(company.id);

    const fetchDel = await Company.fetch(company.id);

    expect(fetchDel).toBeFalsy();
  });
});
