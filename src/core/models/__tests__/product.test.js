const { User, Company, Product, Category } = require('../index');
const { PersistorProvider } = require('../../persist');

const available_days = {
  days: [
    { weekDay: 'Segunda', delivery_hour: { start: '8:00', end: '18:00' } },
    { weekDay: 'Terça', delivery_hour: { start: '9:00', end: '17:00' } },
    { weekDay: 'Quarta', delivery_hour: { start: '8:00', end: '17:00' } },
    { weekDay: 'Quinta', delivery_hour: { start: '8:00', end: '17:00' } },
    { weekDay: 'Sexta', delivery_hour: { start: '8:00', end: '17:00' } },
    { weekDay: 'Sabado', delivery_hour: { start: '8:00', end: '17:00' } },
    { weekDay: 'Domingo', delivery_hour: { start: '8:00', end: '17:00' } },
  ],
  exception: [
    {
      day: '2021-07-01',
      description: 'Tiradentes',
      delivery_hour: { start: '9:00', end: '17:00' },
    },
    {
      day: '2021-07-02',
      description: 'Dia qualquer coisa',
      delivery_hour: { start: '9:00', end: '17:00' },
    },
  ],
};

const _clean = async () => {
  const persistor = PersistorProvider.getPersistor();
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
    'user_test',
    'cpf1',
    'e@as2d.com',
    '151232123',
    'PASSWD',
    new Date()
  ).save();

  const comp = new Company('dc fruit', 'phone', available_days, user.id);
  comp.cod = Company.cod_generator(comp.name);

  await comp.save();
});

describe('Product', () => {
  it('constructor works', () => {
    const company = new Product('');
    expect(company).toBeInstanceOf(Product);
  });

  it('create a product', async () => {
    const category = await new Category('frutas').save();

    const [company] = await Company.getAll();

    await new Product(company.id, 'morango', 9.5, 'KG', category.id).save();
    await new Product(company.id, 'banana', 9.5, 'KG', category.id).save();
    await new Product(company.id, 'uva', 9.5, 'KG', category.id).save();
    const prod = await new Product(
      company.id,
      'laranja',
      9.5,
      'KG',
      category.id
    ).save();

    const fetch = await Product.fetch(prod.id);

    expect(prod.id).toBe(fetch.id);
  });

  it('update product', async () => {
    const category = await new Category('frutas').save();
    const [company] = await Company.getAll();

    const prod = await new Product(
      company.id,
      'laranja',
      9.5,
      'KG',
      category.id
    ).save();

    let fetch = await Product.fetch(prod.id);

    expect(prod.id).toBe(fetch.id);

    prod.name = 'update_';
    prod.save();

    fetch = await Product.fetch(prod.id);

    expect(prod.name).not.toBe(fetch.name);
  });

  it('delete product', async () => {
    const category = await new Category('frutas').save();
    const [company] = await Company.getAll();

    const prod = await new Product(
      company.id,
      'laranja',
      9.5,
      'KG',
      category.id
    ).save();

    let fetch = await Product.fetch(prod.id);

    expect(prod.id).toBe(fetch.id);

    await Product.delete(prod.id);

    fetch = await Product.fetch(prod.id);

    expect(fetch).toBeFalsy();
  });
});
