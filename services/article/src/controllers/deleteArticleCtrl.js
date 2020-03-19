const winston = require('winston');
const { prisma } = require('../../generated/prisma-client');
const { produce } = require('../events/producer');

/**
 * Delete an article
 * @see DELETE /article/:id
 */
module.exports.deleteArticle = async (req, res) => {
  try {
    const deletedArticle = await prisma.deleteArticle({ id: req.params.id });
    await produce('delete-article', deletedArticle);
    res.status(204).send();
  } catch (e) {
    winston.error(e);
    res.status(500).send({ message: e });
  }
};
