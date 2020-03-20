const winston = require('winston');
const { produce } = require('../events/producer');
const { deleteAllCartItems } = require('../repository');

/**
 * Checkout the items for the payment
 * (in our POC this will update article's stocks and empty the cart)
 * @see PUT /cart/items/checkout
 */
module.exports.deleteCartItem = async (req, res) => {
  try {
    const deletedCartItems = await deleteAllCartItems();
    if (deletedCartItems && deletedCartItems.length > 0) {
      await produce('cart-checkout', deletedCartItems);
    }
    res.status(204).send();
  } catch (e) {
    winston.error(e);
    res.status(500).send({ message: e });
  }
};
