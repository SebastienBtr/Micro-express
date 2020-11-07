const express = require('express');
const routesVersioning = require('express-routes-versioning')();

const router = express.Router();
const ctrl = require('./controllers');

/**
 * Health of the service
 */
router.get('/health', (req, res) => res.status(200).send({ message: 'ok' }));

/**
 * Get users
 */
router.get('/users', routesVersioning({
  '^1.0.0': ctrl.getUsers,
}));

/**
 * Get a user by id
 */
router.get('/users/:id', routesVersioning({
  '^1.0.0': ctrl.getUserById,
}));

/**
 * Create a user
 */
router.put('/users', routesVersioning({
  '^1.0.0': ctrl.createUser,
}));

/**
 * Update a user by id
 */
router.put('/users/:id', routesVersioning({
  '^1.0.0': ctrl.updateUserById,
}));

/**
 * Delete a user
 */
router.delete('/users/:id', routesVersioning({
  '^1.0.0': ctrl.deleteUser,
}));

module.exports = router;
