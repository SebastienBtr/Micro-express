const winston = require('winston');
const { getAllCartItems } = require('../repository');

/**
 * Get all the items of the cart
 * @see GET /cart/items
 */
module.exports.getAllCartItems = async (req, res) => {
  try {
    const cartItems = await getAllCartItems();
    res.status(200).send(cartItems);
  } catch (e) {
    winston.error(e);
    res.status(500).send({ message: e });
  }
};
