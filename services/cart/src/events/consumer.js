const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'cart',
  brokers: ['kafka:9092'],
});

const consumer = kafka.consumer({ groupId: 'cart' });

module.exports.launchConsumers = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'delete-article' });
  await consumer.subscribe({ topic: 'update-article' });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      switch (topic) {
        case 'delete-article':
          console.log(message.value.toString());
          break;
        case 'update-article':
          console.log(message.value.toString());
          break;
        default:
      }
    },
  });
};
