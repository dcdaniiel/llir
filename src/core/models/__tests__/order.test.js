const {
  User,
  Company,
  Product,
  Order,
  Payment,
  Category,
} = require('../index');
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
  const comp = persistor.getPersistInstance('Company');
  const user = persistor.getPersistInstance('User');
  const product = persistor.getPersistInstance('Product');
  const order = persistor.getPersistInstance('Order');

  await order.deleteAll();
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

  const category = await new Category('frutas', company.id).save();

  await new Product(company.id, 'morango', 9.5, 'KG', category.id).save();
  await new Product(company.id, 'banana', 9.5, 'KG', category.id).save();
  await new Product(company.id, 'uva', 9.5, 'KG', category.id).save();
});

describe('Order', () => {
  it('constructor works', () => {
    const order = new Order('');
    expect(order).toBeInstanceOf(Order);
  });

  it('create a order', async () => {
    const userClient = await new User(
      'user_test_client',
      'cpf',
      'e@d.com',
      '15123212',
      'PASSWD',
      new Date()
    ).save();

    const [product, ...products] = await Product.getAll();

    const setQuantityProducts = [product, ...products].map((order, index) => ({
      id: order._id,
      quantity: index * 2,
    }));

    const pay = await new Payment(
      product.company_id,
      'Cartão',
      'description',
      true
    ).save();

    await new Order(
      userClient.id,
      product.company_id,
      pay.id,
      new Date(),
      150.68,
      'desc',
      setQuantityProducts,
      'WAITING APPROVAL'
    ).save();
  });

  it('delete a order', async () => {
    const userClient = await new User(
      'user_test_client',
      'cpf',
      'e@d.com',
      '15123212',
      'PASSWD',
      new Date()
    ).save();

    const [product, ...products] = await Product.getAll();

    const setQuantityProducts = [product, ...products].map((order, index) => ({
      ...order,
      _quantity: index * 2,
    }));
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
      setQuantityProducts,
      'WAITING APPROVAL'
    ).save();

    let fetchOrder = await Order.fetch(order.id);

    expect(order.id).toBe(fetchOrder.id);

    await Order.delete(order.id);

    fetchOrder = await Order.fetch(order.id);

    expect(fetchOrder).toBeFalsy();
  });
});
