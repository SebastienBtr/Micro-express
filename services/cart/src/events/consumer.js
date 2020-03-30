const winston = require('winston');
const { Kafka } = require('kafkajs');
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
 * Update a cart-item from an updated article
 */
const updateArticleEvent = async (article) => {
  if (articleFieldsValid(article)) {
    const data = {
      articleName: article.name,
      articlePrice: article.price,
    };
    try {
      await updateCartItemByArticleId(article.id, data);
    } catch (e) {
      winston.error(e);
    }
  } else {
    winston.error(`Invalid cart-item object received: ${article}`);
  }
};

/**
 * Delete a cart-item because of a deleted article
 */
const deleteArticleEvent = async (article) => {
  if (articleFieldsValid(article)) {
    try {
      await deleteCartItemByArticleId(article.id);
    } catch (e) {
      winston.error(e);
    }
  } else {
    winston.error(`Invalid cart-item object received: ${article}`);
  }
};

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
