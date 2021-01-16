const { redis } = require('../helpers');
const { Order, OrderStatus, Payment } = require('../../core/models');

module.exports = () => ({
  async create({ body, cod, user }) {
    const data = await redis.get(`session:${user.id}`);
    const company = data?.companies.find((cp) => cp.cod === cod);

    if (!company) {
      return {
        data: { message: 'Session! Please try login again!' },
        statusCode: 401,
      };
    }

    const [payment] = await Payment.findBy({
      id: body.payment_id,
      company_id: company.id,
      enabled: true,
    });

    if (!payment) {
      return {
        statusCode: 404,
        data: {
          message: 'Invalid payment selected, please select other option!',
        },
      };
    }

    const order = await new Order(
      user.id,
      company.id,
      payment.id,
      body.delivery_day,
      '',
      body.description,
      body.items,
      OrderStatus.WAITING_APPROVAL()
    ).save();

    return {
      statusCode: 200,
      data: { message: 'Order create successfully', order: { id: order.id } },
    };
  },
});
