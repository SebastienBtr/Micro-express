const winston = require('winston');
const { getUsers } = require('../repository');

/**
 * Get users
 * @see GET /users
 */
module.exports.getUsers = async (req, res) => {
  try {
    const { email } = req.query;

    const filters = {
      ...email != null && { email },
    };

    const users = await getUsers(filters);
    res.status(200).send(users);
  } catch (e) {
    winston.error(e);
    res.status(500).send({ message: e });
  }
};
