const { Kafka } = require('kafkajs');
const winston = require('winston');
const { updateCartItemByArticleId, deleteCartItemByArticleId } = require('../repository');
const topics = require('./topics');
const kafkaConfig = require('./kafkaConfig');

const kafka = new Kafka(kafkaConfig.config);
const consumer = kafka.consumer({ groupId: 'cart' });

/**
 * Check if we have the necessary fields in the article object
 */
const articleFieldsValid = (article) => {
  if (!article || !article.id || !article.name || !article.price) {
    return false;
  }
  return true;
};

/**
 * Delete a cart-item because of a deleted article
 */
const deleteArticleEvent = async (data) => {
  if (articleFieldsValid(data)) {
    try {
      await deleteCartItemByArticleId(data.id);
    } catch (e) {
      winston.error(e);
    }
  } else {
    winston.error(`Invalid cart-item object received: ${data}`);
  }
};

/**
 * Update a cart-item from an updated article
 */
const updateArticleEvent = async (data) => {
  if (articleFieldsValid(data)) {
    const article = {
      articleName: data.name,
      articlePrice: data.price,
    };
    try {
      await updateCartItemByArticleId(data.id, article);
    } catch (e) {
      winston.error(e);
    }
  } else {
    winston.error(`Invalid cart-item object received: ${data}`);
  }
};

/**
 * Subscribe to kafka topics
 */
module.exports.launchConsumers = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: topics.DELETE_ARTICLE });
    await consumer.subscribe({ topic: topics.UPDATE_ARTICLE });

    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        switch (topic) {
          case topics.DELETE_ARTICLE:
            await deleteArticleEvent(JSON.parse(message.value.toString()));
            break;
          case topics.UPDATE_ARTICLE:
            await updateArticleEvent(JSON.parse(message.value.toString()));
            break;
          default:
        }
      },
    });
  } catch (e) {
    winston.error(e);
  }
};
