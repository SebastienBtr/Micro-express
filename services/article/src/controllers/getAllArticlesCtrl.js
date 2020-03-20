const winston = require('winston');
const { getAllArticles } = require('../repository');

/**
 * Get all the articles
 * @see GET /article
 */
module.exports.getAllArticles = async (req, res) => {
  try {
    const articles = await getAllArticles();
    res.status(200).send(articles);
  } catch (e) {
    winston.error(e);
    res.status(500).send({ message: e });
  }
};
