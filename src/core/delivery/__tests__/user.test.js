const { User } = require('../index');
const { PersistorProvider } = require('../../persist');
const { persist_options } = require('../../settings');

const _clean = async () => {
  const persistor = PersistorProvider.getPersistor(...persist_options);
};

beforeEach(async () => {
  await _clean();
});

describe('User', () => {
  it('constructor works', () => {
    const user = new User('teste', 'teste@com', '15999999999', '');
    expect(user).toBeInstanceOf(User);
  });
});
