const winston = require('winston');
const bcrypt = require('bcrypt');
const { getUsersByEmail } = require('../services/usersService');
const { getToken } = require('../utils/tokenGenerator');

/**
 * Check if the body of the request contains the good elements
 */
const bodyIsValid = (body) => {
  const { email, password } = body;
  if (!email || !password) {
    return false;
  }
  return true;
};

/**
 * Login
 * @see POST /auth/login
 */
module.exports.login = async (req, res) => {
  if (bodyIsValid(req.body)) {
    try {
      const users = (await getUsersByEmail(req.body.email)).data;
      if (users.length > 0) {
        const isValidPassword = await bcrypt.compare(req.body.password, users[0].password);
        if (isValidPassword) {
          res.status(200).send(getToken(users[0].id, 'user'));
        } else {
          res.status(401).send({});
        }
      } else {
        res.status(401).send({});
      }
    } catch (e) {
      winston.error(e.response.data.message);
      res.status(e.response.status).send({ message: e.response.data.message });
    }
  } else {
    res.status(400).send({ message: 'Invalid body format' });
  }
};
