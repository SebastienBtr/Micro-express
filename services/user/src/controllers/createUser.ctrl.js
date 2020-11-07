const winston = require('winston');

/**
 * Check if the body of the request contains the good elements
 */
const bodyIsValid = (body) => {
  const { firstName, lastName, email, password } = body;
  if (!firstName || !lastName || !email || !password) {
    return false;
  }
  return true;
};

/**
 * Create a user
 * @see PUT /users
 */
module.exports.createUser = async (req, res) => {
  if (bodyIsValid(req.body)) {
    try {
      // TODO:
      res.status(200).send({});
    } catch (e) {
      winston.error(e);
      res.status(500).send({ message: e });
    }
  } else {
    res.status(400).send({ message: 'Invalid body format' });
  }
};
