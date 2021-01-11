const { Image } = require('../../core/models');

module.exports = () => ({
  async create(file) {
    const image_url = `http://${process.env.API_URL}:${process.env.PORT_HTTP}/public/uploads/${file.filename}`;
    const image = await new Image(image_url).save();

    return {
      statusCode: 201,
      data: { message: 'Upload successfully!', file: image.id },
    };
  },
});
