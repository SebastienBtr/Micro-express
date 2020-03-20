const winston = require('winston');
const { updateCartItemQuantity } = require('../repository');

/**
 * Check if the body of the request contains the good elements
 */
const bodyIsValid = (body) => {
  const { quantity } = body;
  if (!quantity || quantity !== parseFloat(quantity, 10)) {
    return false;
  }
  return true;
};

/**
 * Update the quantity of an item of the cart
 * @see PUT /article/:id/quantity
 */
module.exports.updateCartItemQuantity = async (req, res) => {
  if (bodyIsValid(req.body)) {
    let { quantity } = req.body;
    if (quantity < 1) {
      quantity = 1;
    }
    try {
      const updatedCartItem = await updateCartItemQuantity(req.params.id, quantity);
      if (updatedCartItem != null) {
        res.status(200).send(updatedCartItem);
      } else {
        res.status(404).send({ message: `No cart-item with id: ${req.params.id}` });
      }
    } catch (e) {
      winston.error(e);
      res.status(500).send({ message: e });
    }
  } else {
    res.status(400).send({ message: 'Invalid body format' });
  }
};
