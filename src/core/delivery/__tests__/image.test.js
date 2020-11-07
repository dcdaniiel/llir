const { Image } = require('../index');
const { PersistorProvider } = require('../../persist');
const { persist_options } = require('../../../settings');

const _clean = async () => {
  const persistor = PersistorProvider.getPersistor(...persist_options);
  const image = persistor.getPersistInstance('Image');

  await image.deleteAll();
};

beforeEach(async () => {
  await _clean();
});

describe('Image', () => {
  it('constructor works', () => {
    const company = new Image('');
    expect(company).toBeInstanceOf(Image);
  });

  it('create a image', async () => {
    const img = await new Image('SOURCE').save();

    const data = await Image.fetch(img.id);

    expect(data.id).toBe(img.id);
  });

  it('update image', async () => {
    const image = await new Image('SOURCE').save();

    const fetchImage = await Image.fetch(image.id);
    fetchImage.source = 'update_source';
    fetchImage.save();

    expect(image.source).not.toEqual(fetchImage.source);
  });

  it('delete image', async () => {
    const image = await new Image('SOURCE').save();

    await Image.delete(image.id);

    const fetch = await Image.fetch(image.id);

    expect(fetch).toBeFalsy();
  });
});
