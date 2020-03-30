const winston = require('winston');
const { produce } = require('../events/producer');
const topics = require('../events/topics');
const { deleteAllCartItems, getAllCartItems } = require('../repository');

/**
 * Checkout the items for the payment
 * (in our POC this will update article's stocks and empty the cart)
 * @see PUT /cart/items/checkout
 */
module.exports.checkout = async (req, res) => {
  try {
    const cartItems = await getAllCartItems();
    const deletedCartItems = await deleteAllCartItems();
    if (deletedCartItems.count > 0) {
      await produce(topics.CART_CHECKOUT, cartItems);
    }
    res.status(204).send();
  } catch (e) {
    winston.error(e);
    res.status(500).send({ message: e });
  }
};
