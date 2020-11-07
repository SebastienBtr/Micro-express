const winston = require('winston');

/**
 * Get a user by id
 * @see GET /users/:id
 */
module.exports.getUserById = async (req, res) => {
  try {
    // TODO:
    res.status(200).send({});
  } catch (e) {
    winston.error(e);
    res.status(500).send({ message: e });
  }
};
