const winston = require('winston');
const { prisma } = require('../../generated/prisma-client');

/**
 * Delete an article
 * @see DELETE /article/:id
 */
module.exports.deleteArticle = async (req, res) => {
  try {
    await prisma.deleteArticle({ id: req.params.id });
    res.status(204).send();
  } catch (e) {
    winston.error(e);
    res.status(500).send({ message: e });
  }
};
