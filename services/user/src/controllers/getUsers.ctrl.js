const winston = require('winston');

/**
 * Get users
 * @see GET /users
 */
module.exports.getUsers = async (req, res) => {
  try {
    // TODO:
    res.status(200).send({});
  } catch (e) {
    winston.error(e);
    res.status(500).send({ message: e });
  }
};
