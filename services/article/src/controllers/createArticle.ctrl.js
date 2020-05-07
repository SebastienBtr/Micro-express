const winston = require('winston');
const { createArticle } = require('../repository');

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
 * Create an article
 * @see POST /articles
 */
module.exports.createArticle = async (req, res) => {
  if (bodyIsValid(req.body)) {
    try {
      const newArticle = await createArticle(req.body);
      res.status(201).send(newArticle);
    } catch (e) {
      winston.error(e);
      res.status(500).send({ message: e });
    }
  } else {
    res.status(400).send({ message: 'Invalid body format' });
  }
};
