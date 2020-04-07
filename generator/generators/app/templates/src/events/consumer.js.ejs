const { Kafka } = require('kafkajs');
const winston = require('winston');
const { decrementArticleStock } = require('../repository');
const topics = require('./topics');
const kafkaConfig = require('./kafkaConfig');

const kafka = new Kafka(kafkaConfig.config);
const consumer = kafka.consumer({ groupId: 'article' });

/**
 * Check if we have the necessary fields in the cart-item object
 */
const cartItemFieldsValid = (cartItem) => {
  if (!cartItem || !cartItem.articleId || !cartItem.quantity) {
    return false;
  }
  return true;
};

/**
 * Update the stocks of the articles according to the quantity
 * that a user checked out in his cart
 */
const cartCheckoutEvent = async (cartItems) => {
  cartItems.forEach(async (item) => {
    if (cartItemFieldsValid(item)) {
      try {
        await decrementArticleStock(item.articleId, item.quantity);
      } catch (e) {
        winston.error(e);
      }
    } else {
      winston.error(`Invalid cart-item object received: ${item}`);
    }
  });
};

/**
 * Subscribe to kafka topics
 */
module.exports.launchConsumers = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: topics.CART_CHECKOUT });

    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        switch (topic) {
          case topics.CART_CHECKOUT:
            await cartCheckoutEvent(JSON.parse(message.value.toString()));
            break;
          default:
        }
      },
    });
  } catch (e) {
    winston.error(e);
  }
};
