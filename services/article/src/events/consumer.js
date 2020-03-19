const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'article',
  brokers: ['kafka:9092'],
});

const consumer = kafka.consumer({ groupId: 'article' });

module.exports.launchConsumers = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'cart-checkout' });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      switch (topic) {
        case 'cart-checkout':
          console.log(message.value.toString());
          break;
        default:
      }
    },
  });
};
