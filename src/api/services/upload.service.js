const { Image } = require('../../core/models');

module.exports = () => ({
  async create(file) {
    const image = await new Image(file.path).save();

    return {
      statusCode: 201,
      data: { message: 'Upload successfully!', file: image.id },
    };
  },
});
