const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'article',
  brokers: ['kafka:9092'],
});

const producer = kafka.producer({ idempotent: true });

module.exports.produce = async (topic, content) => {
  await producer.connect();
  await producer.send({
    topic,
    messages: [
      { value: JSON.stringify(content) },
    ],
  });
  await producer.disconnect();
};
