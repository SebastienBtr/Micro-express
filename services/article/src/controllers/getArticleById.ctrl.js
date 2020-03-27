const winston = require('winston');
const { getArticleById } = require('../repository');

/**
 * Get an article by id
 * @see GET /article/:id
 */
module.exports.getArticleById = async (req, res) => {
  try {
    const article = await getArticleById(req.params.id);
    if (article != null) {
      res.status(200).send(article);
    } else {
      res.status(404).send({ message: `No article with id: ${req.params.id}` });
    }
  } catch (e) {
    winston.error(e);
    res.status(500).send({ message: e });
  }
};
