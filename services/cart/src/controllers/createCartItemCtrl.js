const winston = require('winston');
const { createCartItem, getCartItemByArticleId, updateCartItemQuantity } = require('../repository');

/**
 * Check if the body of the request contains the good elements
 */
const bodyIsValid = (body) => {
  const { articleId, articleName, articlePrice } = body;
  if (!articleId || !articleName || !articlePrice
    || articlePrice !== parseFloat(articlePrice, 10)) {
    return false;
  }
  return true;
};

/**
 * Add an item in the cart
 * @see POST /cart/items
 */
module.exports.createCartItem = async (req, res) => {
  if (bodyIsValid(req.body)) {
    const { quantity } = req.body;
    if (!quantity || quantity !== parseInt(quantity, 10)) {
      req.body.quantity = 1;
    }
    try {
      const existingCartItem = await getCartItemByArticleId(req.body.articleId);
      if (existingCartItem) {
        const newQuantity = existingCartItem.quantity + quantity;
        const cartItem = await updateCartItemQuantity(existingCartItem.id, newQuantity);
        res.status(200).send(cartItem);
      } else {
        const cartItem = await createCartItem();
        res.status(201).send(cartItem);
      }
    } catch (e) {
      winston.error(e);
      res.status(500).send({ message: e });
    }
  } else {
    res.status(400).send({ message: 'Invalid body format' });
  }
};
