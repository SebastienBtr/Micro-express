const winston = require('winston');
const { prisma } = require('../../generated/prisma-client');
const { produce } = require('../events/producer');

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
 * Update an article
 * @see PUT /article/:id
 */
module.exports.updateArticle = async (req, res) => {
  if (bodyIsValid(req.body)) {
    try {
      const newArticle = await prisma.updateArticle({
        data: {
          name: req.body.name,
          stock: req.body.stock,
          price: req.body.price,
        },
        where: {
          id: req.params.id,
        },
      });
      await produce('update-article', newArticle);
      res.status(200).send(newArticle);
    } catch (e) {
      winston.error(e);
      res.status(500).send({ message: e });
    }
  } else {
    res.status(400).send({ message: 'Invalid body format' });
  }
};
