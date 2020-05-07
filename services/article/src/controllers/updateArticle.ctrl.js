const winston = require('winston');
const { updateArticle } = require('../repository');
const { produce } = require('../events/producer');
const topics = require('../events/topics');

/**
 * Check if the body of the request contains the good elements
 */
const bodyIsValid = (body) => {
  const { name, stock, price } = body;
  if (!name || !stock || stock !== parseInt(stock, 10)
    || !price || price !== parseFloat(price, 10)) {
    return false;
  }
  return true;
};

/**
 * Update a specific article
 * @see PUT /articles/:id
 */
module.exports.updateArticle = async (req, res) => {
  if (bodyIsValid(req.body)) {
    try {
      const updatedArticle = await updateArticle(req.params.id, req.body);
      if (updatedArticle != null) {
        await produce(topics.UPDATE_ARTICLE, updatedArticle);
        res.status(200).send(updatedArticle);
      } else {
        res.status(404).send({ message: `No article with id: ${req.params.id}` });
      }
    } catch (e) {
      winston.error(e);
      res.status(500).send({ message: e });
    }
  } else {
    res.status(400).send({ message: 'Invalid body format' });
  }
};
