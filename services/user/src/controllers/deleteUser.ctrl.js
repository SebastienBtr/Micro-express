const winston = require('winston');

/**
 * Delete a user
 * @see DELETE /users/:id
 */
module.exports.deleteUser = async (req, res) => {
  try {
    // TODO:
    res.status(200).send({});
  } catch (e) {
    winston.error(e);
    res.status(500).send({ message: e });
  }
};
