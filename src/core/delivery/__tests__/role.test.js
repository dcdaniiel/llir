const { Role, RoleTypes } = require('../index');
const { PersistorProvider } = require('../../persist');
const { persist_options } = require('../../settings');

const _clean = async () => {
  const persistor = PersistorProvider.getPersistor(...persist_options);
  const role = persistor.getPersistInstance('Role');

  await role.deleteAll();
};

beforeEach(async () => {
  await _clean();
});

describe('Role', () => {
  it('constructor works', () => {
    const company = new Role('');
    expect(company).toBeInstanceOf(Role);
  });

  it('create a role', async () => {
    const img = await new Role(RoleTypes.CLIENT()).save();

    const data = await Role.fetch(img.id);

    expect(data.id).toBe(img.id);
  });

  it('update role', async () => {
    const role = await new Role(RoleTypes.FUNCTIONARY()).save();

    const fetchRole = await Role.fetch(role.id);
    fetchRole.role = RoleTypes.CLIENT();
    fetchRole.save();

    expect(role.role).not.toEqual(fetchRole.role);
  });

  it('delete role', async () => {
    const role = await new Role(RoleTypes.CLIENT()).save();

    await Role.delete(role.id);

    const fetch = await Role.fetch(role.id);

    expect(fetch).toBeFalsy();
  });
});
