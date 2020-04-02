const winston = require('winston');
const { Kafka } = require('kafkajs');
const kafkaConfig = require('./kafkaConfig');

const kafka = new Kafka(kafkaConfig.config);
const producer = kafka.producer({ idempotent: true });

module.exports.produce = async (topic, content) => {
  try {
    await producer.connect();
    await producer.send({
      topic,
      messages: [
        { value: JSON.stringify(content) },
      ],
    });
    await producer.disconnect();
  } catch (e) {
    winston.error(e);
  }
};
