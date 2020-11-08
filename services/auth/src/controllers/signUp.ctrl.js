const winston = require('winston');
const { createUser } = require('../services/usersService');

/**
 * Check if the body of the request contains the good elements
 */
const bodyIsValid = (body) => {
  const {
    firstName, lastName, email, password,
  } = body;
  if (!firstName || !lastName || !email || !password) {
    return false;
  }
  return true;
};

/**
 * Sign up
 * @see PUT /auth/sign-up
 */
module.exports.signUp = async (req, res) => {
  if (bodyIsValid(req.body)) {
    try {
      await createUser(req.body.firstName, req.body.lastName,
        req.body.email, req.body.password);
      res.status(204).send();
    } catch (e) {
      winston.error(e.response.data.message);
      res.status(e.response.status).send({ message: e.response.data.message });
    }
  } else {
    res.status(400).send({ message: 'Invalid body format' });
  }
};
