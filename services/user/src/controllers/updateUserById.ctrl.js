const winston = require('winston');
const {
  updateUserById, getUsers, getUserById,
} = require('../repository');

/**
 * Check if the body of the request contains the good elements
 */
const bodyIsValid = (body) => {
  const {
    firstName, lastName, email,
  } = body;
  if (!firstName || !lastName || !email) {
    return false;
  }
  return true;
};

/**
 * Update a user by id
 * @see PUT /users/:id
 */
module.exports.updateUserById = async (req, res) => {
  if (bodyIsValid(req.body)) {
    try {
      const existingUser = await getUserById(req.params.id);
      if (existingUser == null) {
        res.status(404).send({ message: `No user with id: ${req.params.id}` });
        return;
      }
      // Check that the user is still unique
      const users = await getUsers({ email: req.body.email });
      if (users.length > 0 && users[0].id !== existingUser.id) {
        res.status(422).send({ message: 'A user with this email already exist' });
        return;
      }
      const updatedUser = await updateUserById(req.params.id, req.body);
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
