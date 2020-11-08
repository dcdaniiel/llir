const { User, Company, Product, Order, Payment } = require('../index');
const { PersistorProvider } = require('../../persist');
const { persist_options } = require('../../../settings');

const available_days = {
  days: [
    { day: new Date(), delivery_hour: { start: '8:00', end: '18:00' } },
    { day: new Date(), delivery_hour: { start: '9:00', end: '17:00' } },
    { day: new Date(), delivery_hour: { start: '8:00', end: '17:00' } },
  ],
};

const _clean = async () => {
  const persistor = PersistorProvider.getPersistor(...persist_options);
  const comp = persistor.getPersistInstance('Company');
  const user = persistor.getPersistInstance('User');
  const product = persistor.getPersistInstance('Product');

  await product.deleteAll();
  await comp.deleteAll();
  await user.deleteAll();
};

beforeEach(async () => {
  await _clean();
  const user = await new User(
    'user_test_company',
    'cpf1',
    'e@as2d.com',
    '151232123',
    'PASSWD',
    new Date()
  ).save();

  const company = new Company('dc fruit', 'phone', available_days, user.id);
  company.cod = Company.cod_generator(company.name);

  await company.save();

  await new Product(company.id, 'morango', 9.5, 'KG', 'frutas').save();
  await new Product(company.id, 'banana', 9.5, 'KG', 'frutas').save();
  await new Product(company.id, 'uva', 9.5, 'KG', 'frutas').save();
});

describe('Product', () => {
  it('constructor works', () => {
    const order = new Order('');
    expect(order).toBeInstanceOf(Order);
  });

  it('create a order', async () => {
    const persistor = PersistorProvider.getPersistor(...persist_options);
    const ProductInstance = persistor.getPersistInstance('Product');

    const userClient = await new User(
      'user_test_client',
      'cpf',
      'e@d.com',
      '15123212',
      'PASSWD',
      new Date()
    ).save();

    const [product, ...products] = await ProductInstance.getAll();

    const pay = await new Payment(
      product.company_id,
      'Cartão',
      'description',
      true
    ).save();

    const order = await new Order(
      userClient.id,
      product.company_id,
      pay.id,
      new Date(),
      150.68,
      'desc',
      { ...products },
      'WAITING APPROVAL'
    ).save();

    console.log('ORDER::: ', order);
  });
});
