const winston = require('winston');
const { prisma } = require('../../generated/prisma-client');

/**
 * Get all the articles
 * @see GET /article
 */
module.exports.getAllArticles = async (req, res) => {
  try {
    const articles = await prisma.articles();
    res.status(200).send(articles);
  } catch (e) {
    winston.error(e);
    res.status(500).send({ message: e });
  }
};
