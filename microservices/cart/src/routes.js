const express = require('express');
const routesVersioning = require('express-routes-versioning')();

const router = express.Router();
const ctrl = require('./controllers');

/**
 * Health of the service
 */
router.get('/health', (req, res) => res.status(200).send({ message: 'ok' }));

/**
 * Get all the cart-items
 */
router.get('/cart/items', routesVersioning({
  '^1.0.0': ctrl.getAllCartItems,
}));

module.exports = router;
