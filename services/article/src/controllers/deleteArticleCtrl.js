const winston = require('winston');
const { deleteArticle } = require('../repository');
const { produce } = require('../events/producer');

/**
 * Delete an article
 * @see DELETE /article/:id
 */
module.exports.deleteArticle = async (req, res) => {
  try {
    const deletedArticle = await deleteArticle(req.params.id);
    if (deleteArticle != null) {
      await produce('delete-article', deletedArticle);
    }
    res.status(204).send();
  } catch (e) {
    winston.error(e);
    res.status(500).send({ message: e });
  }
};
