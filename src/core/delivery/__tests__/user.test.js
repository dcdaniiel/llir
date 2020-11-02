const { User } = require('../index');
const { PersistorProvider } = require('../../persist');
const { persist_options } = require('../../settings');

const _clean = async () => {
  const persistor = PersistorProvider.getPersistor(...persist_options);
  const user = persistor.getPersistInstance('User');

  await user.deleteAll();
};

beforeEach(async () => {
  await _clean();
});

describe('User', () => {
  it('constructor works', () => {
    const user = new User({
      name: 'teste',
      email: 'daniel@test.com',
      birthdate: new Date(),
      password: 'PASSWD',
      phone: '159999999',
    });
    expect(user).toBeInstanceOf(User);
  });

  it('create a user', async () => {
    const user = new User(
      'create_user',
      'cpf',
      'email',
      'phone',
      'PASSWD',
      new Date()
    );

    await user.save();

    const fetchUser = await User.fetch(user.id);

    expect(fetchUser.id).toBe(user.id);
  });

  it('update user', async () => {
    const user = new User(
      'create_user',
      'cpf',
      'email',
      'phone',
      'PASSWD',
      new Date()
    );

    await user.save();

    const fetchUser = await User.fetch(user.id);

    expect(fetchUser.id).toBe(user.id);
    expect(fetchUser.name).toBe(user.name);

    fetchUser.name = 'update_user';
    const updateUser = await fetchUser.save();

    expect(updateUser.id).toBe(user.id);
    expect(updateUser.name).not.toEqual(user.name);
  });

  it('delete user', async () => {
    const user = new User(
      'create_user',
      'cpf',
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
