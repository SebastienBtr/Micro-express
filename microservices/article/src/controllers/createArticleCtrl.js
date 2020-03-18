const winston = require('winston');
const { prisma } = require('../../generated/prisma-client');


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
 * @see POST /article
 */
module.exports.createArticle = async (req, res) => {
  if (bodyIsValid(req.body)) {
    try {
      const newArticle = await prisma.createArticle({
        name: req.body.name,
        stock: req.body.stock,
        price: req.body.price,
      });
      res.status(201).send(newArticle);
    } catch (e) {
      winston.error(e);
      res.status(500).send({ message: e });
    }
  } else {
    res.status(400).send({ message: 'Invalid body format' });
  }
};
