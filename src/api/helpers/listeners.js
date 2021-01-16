const { OrderStatus } = require('../../core/models');
const { mqttClient, emitter } = require('../../utils');

const notifyOrderListener = async () => {
  emitter.on(OrderStatus.WAITING_APPROVAL(), (content) => {
    console.log('WAITING APPROVAL', content);
  });
};

const startListeners = async () => {
  await notifyOrderListener();
};

module.exports = { startListeners };
