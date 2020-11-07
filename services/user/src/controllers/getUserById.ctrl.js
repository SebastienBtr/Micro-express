const winston = require('winston');
const { getUserById } = require('../repository');

/**
 * Get a user by id
 * @see GET /users/:id
 */
module.exports.getUserById = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (user != null) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: `No user with id: ${req.params.id}` });
    }
  } catch (e) {
    winston.error(e);
    res.status(500).send({ message: e });
  }
};
