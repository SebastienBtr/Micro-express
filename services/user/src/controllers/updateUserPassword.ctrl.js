const winston = require('winston');
const bcrypt = require('bcrypt');
const { updateUserPassword } = require('../repository');

/**
 * Check if the body of the request contains the good elements
 */
const bodyIsValid = (body) => {
  const { password } = body;
  if (!password) {
    return false;
  }
  return true;
};

/**
 * Update the password of a user
 * @see PUT /users/:id/password
 */
module.exports.updateUserPassword = async (req, res) => {
  if (bodyIsValid(req.body)) {
    try {
      const password = await bcrypt.hash(req.body.password, 10);
      const updatedUser = await updateUserPassword(req.params.id, password);
      if (updatedUser != null) {
        res.status(200).send(updatedUser);
      } else {
        res.status(404).send({ message: `No user with id: ${req.params.id}` });
      }
    } catch (e) {
      winston.error(e);
      res.status(500).send({ message: e });
    }
  } else {
    res.status(400).send({ message: 'Invalid body format' });
  }
};
