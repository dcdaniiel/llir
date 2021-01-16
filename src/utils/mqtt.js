const mqtt = require('async-mqtt');
const { emitter } = require('./emitter');

let client;
async function connect() {
  try {
    client = await mqtt.connectAsync({
      hostname: process.env.HOST_MQTT,
      port: 8000,
      protocol: process.env.PROTOCOL_MQTT,
      path: process.env.PATH_MQTT,
    });
  } catch (error) {
    emitter.emit('Error at mqtt connect');
    emitter.emit(error);
  }
}

async function sendMessage(topic, message) {
  if (client && client.connected) {
    await client.publish(topic, JSON.stringify(message));
  }
}

module.exports = {
  sendMessage,
  connect,
};
