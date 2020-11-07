const winston = require('winston');
const { deleteUser } = require('../repository');

/**
 * Delete a user
 * @see DELETE /users/:id
 */
module.exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await deleteUser(req.params.id);
    if (deletedUser != null) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: `No user with id: ${req.params.id}` });
    }
  } catch (e) {
    winston.error(e);
    res.status(500).send({ message: e });
  }
};
