const express = require('express');
const routesVersioning = require('express-routes-versioning')();

const router = express.Router();
const ctrl = require('./controllers');

/**
 * Health of the service
 */
router.get('/health', (req, res) => res.status(200).send({ message: 'ok' }));

/**
 * Login
 */
router.post('/auth/login', routesVersioning({
  '^1.0.0': ctrl.login,
}));

/**
 * Sign up
 */
router.put('/auth/sign-up', routesVersioning({
  '^1.0.0': ctrl.signUp,
}));

module.exports = router;
