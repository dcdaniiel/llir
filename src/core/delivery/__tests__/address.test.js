const { Address, User } = require('../index');
const { PersistorProvider } = require('../../persist');
const { persist_options } = require('../../settings');

const _clean = async () => {
  const persistor = PersistorProvider.getPersistor(...persist_options);
  const address = persistor.getPersistInstance('Address');
  const user = persistor.getPersistInstance('User');

  await address.deleteAll();
  await user.deleteAll();
};

beforeEach(async () => {
  await _clean();
});

describe('Address', () => {
  it('constructor works', () => {
    const address = new Address('street', '123', 'city', 'district', 'desc');
    expect(address).toBeInstanceOf(Address);
  });

  it('create a address', async () => {
    const user = await new User(
      'create_user',
      'email',
      'phone',
      'PASSWD',
      new Date()
    ).save();

    const address = await new Address(
      'street',
      '123',
      'city',
      'district',
      'desc',
      user.id,
      null
    ).save();

    await address.save();

    const fetchAddress = await Address.fetch(address.id);

    expect(fetchAddress.id).toBe(address.id);
  });

  it('update address', async () => {
    const user = await new User(
      'create_user',
      'email',
      'phone',
      'PASSWD',
      new Date()
    ).save();

    const address = await new Address(
      'street',
      '123',
      'city',
      'district',
      'desc',
      user.id,
      null
    ).save();

    await address.save();

    const fetchAddress = await Address.fetch(address.id);

    fetchAddress.street = 'update_street';
    fetchAddress.city = 'update_city';
    fetchAddress.number = '1234';
    await fetchAddress.save();

    const updated = await Address.fetch(address.id);

    expect(updated.id).toBe(address.id);
    expect(updated.street).not.toEqual(address.street);
    expect(updated.city).not.toEqual(address.city);
    expect(updated.number).not.toEqual(address.number);
  });

  it('delete user', async () => {
    const user = new User(
      'create_user',
      'email',
      'phone',
      'PASSWD',
      new Date()
    );

    await user.save();

    const fetchUser = await User.fetch(user.id);

    expect(fetchUser.id).toBe(user.id);

    await User.delete(fetchUser.id);

    const exist = await User.fetch(user.id);

    expect(exist).toBeFalsy();
  });
});
