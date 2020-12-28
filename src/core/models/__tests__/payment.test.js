const { Company, User, Payment } = require('../index');
const { PersistorProvider } = require('../../persist');

const available_days = {
  days: [
    { day: new Date(), delivery_hour: { start: '8:00', end: '18:00' } },
    { day: new Date(), delivery_hour: { start: '9:00', end: '17:00' } },
    { day: new Date(), delivery_hour: { start: '8:00', end: '17:00' } },
  ],
};

const _clean = async () => {
  const persistor = PersistorProvider.getPersistor();
  const company = persistor.getPersistInstance('Company');
  const user = persistor.getPersistInstance('User');

  await company.deleteAll();
  await user.deleteAll();
};

beforeEach(async () => {
  await _clean();
});

describe('Payment', () => {
  it('constructor works', () => {
    const company = new Company('');
    expect(company).toBeInstanceOf(Company);
  });

  it('create a payment option', async () => {
    const user = await new User(
      'user_test',
      'cpf1',
      'e@as2d.com',
      '151232123',
      'PASSWD',
      new Date()
    ).save();

    const comp2 = new Company('Lima fruit', 'phone', available_days, user.id);

    comp2.cod = Company.cod_generator(comp2.name);

    await comp2.save();

    const pay = await new Payment(
      comp2.id,
      'Cartão',
      'description',
      true
    ).save();

    expect(pay.id).toBeTruthy();

    const fetch = await Payment.fetch(pay.id);

    expect(fetch.id).toBe(pay.id);
  });

  it('delete a payment option', async () => {
    const user = await new User(
      'user_test',
      'cpf1',
      'e@as2d.com',
      '151232123',
      'PASSWD',
      new Date()
    ).save();

    const comp2 = new Company('Lima fruit', 'phone', available_days, user.id);

    comp2.cod = Company.cod_generator(comp2.name);

    await comp2.save();

    const pay = await new Payment(
      comp2.id,
      'Cartão',
      'description',
      true
    ).save();

    expect(pay.id).toBeTruthy();

    let fetch = await Payment.fetch(pay.id);

    expect(fetch.id).toBe(pay.id);

    await Payment.delete(fetch.id);

    fetch = await Payment.fetch(pay.id);

    expect(fetch).toBeFalsy();
  });
});
