const winston = require('winston');
const { deleteCartItem } = require('../repository');

/**
 * Delete an item of the cart
 * @see DELETE /cart/items/:id
 */
module.exports.deleteCartItem = async (req, res) => {
  try {
    const deletedCartItem = await deleteCartItem(req.params.id);
    if (deletedCartItem != null) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: `No cart-item with id: ${req.params.id}` });
    }
  } catch (e) {
    winston.error(e);
    res.status(500).send({ message: e });
  }
};
