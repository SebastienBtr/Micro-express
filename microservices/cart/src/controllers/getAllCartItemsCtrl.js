const winston = require('winston');
const { prisma } = require('../../generated/prisma-client');

/**
 * Get all the cart items
 * @see GET /cart/items
 */
module.exports.getAllCartItems = async (req, res) => {
  try {
    const cartItems = await prisma.cartItems();
    res.status(200).send(cartItems);
  } catch (e) {
    winston.error(e);
    res.status(500).send({ message: e });
  }
};
