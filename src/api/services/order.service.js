const { redis } = require('../helpers');
const {
  Order,
  OrderStatus,
  Payment,
  OrderDetail,
} = require('../../core/models');

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
      data: {
        message: 'Order create successfully',
        order: { id: order.id, delivery_day: order.delivery_day },
      },
    };
  },
  async list({ user, cod }) {
    const data = await redis.get(`session:${user.id}`);
    const company = data?.companies.find((cp) => cp.cod === cod);

    if (!company) {
      return {
        data: { message: 'Session! Please try login again!' },
        statusCode: 401,
      };
    }

    const orders = await Order.findBy({
      company_id: company.id,
      user_id: user.id,
    });

    if (!orders.length) {
      return {
        statusCode: 204,
        data: {},
      };
    }

    const ordersData = await Promise.all(
      orders.map(async (order) => {
        const items = (
          await OrderDetail.findBy({
            order_id: order._id,
          })
        ).map(({ name, price, type, quantity }) => ({
          name,
          price,
          type,
          quantity,
        }));
        return {
          id: order._id,
          status: order._status,
          created_at: order._created_at,
          total: order._total,
          payment: (await Payment.fetch(order._payment_id)).payment_type,
          items,
        };
      })
    );

    return {
      statusCode: 200,
      data: {
        message: 'list orders',
        orders: ordersData,
      },
    };
  },
});
