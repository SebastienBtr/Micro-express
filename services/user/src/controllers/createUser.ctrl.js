const winston = require('winston');
const bcrypt = require('bcrypt');
const { createUser, getUsers } = require('../repository');

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
 * Create a user
 * @see PUT /users
 */
module.exports.createUser = async (req, res) => {
  if (bodyIsValid(req.body)) {
    try {
      const users = await getUsers({ email: req.body.email });
      if (users.length > 0) {
        res.status(422).send({ message: 'A user with this email already exist' });
        return;
      }
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const newUser = await createUser(req.body);
      res.status(201).send(newUser);
    } catch (e) {
      winston.error(e);
      res.status(500).send({ message: e });
    }
  } else {
    res.status(400).send({ message: 'Invalid body format' });
  }
};
