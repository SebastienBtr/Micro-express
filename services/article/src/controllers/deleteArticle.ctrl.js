const winston = require('winston');
const { deleteArticle } = require('../repository');
const { produce } = require('../events/producer');
const topics = require('../events/topics');

/**
 * Delete an article
 * @see DELETE /article/:id
 */
module.exports.deleteArticle = async (req, res) => {
  try {
    const deletedArticle = await deleteArticle(req.params.id);
    if (deletedArticle != null) {
      await produce(topics.DELETE_ARTICLE, deletedArticle);
      res.status(204).send();
    } else {
      res.status(404).send({ message: `No article with id: ${req.params.id}` });
    }
  } catch (e) {
    winston.error(e);
    res.status(500).send({ message: e });
  }
};
