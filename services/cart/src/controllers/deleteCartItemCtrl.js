const winston = require('winston');
const { deleteCartItem } = require('../repository');

/**
 * Delete an item of the cart
 * @see DELETE /cart/items/:id
 */
module.exports.deleteCartItem = async (req, res) => {
  try {
    await deleteCartItem(req.params.id);
    res.status(204).send();
  } catch (e) {
    winston.error(e);
    res.status(500).send({ message: e });
  }
};
