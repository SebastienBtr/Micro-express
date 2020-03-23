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

/**
 * Add an item in the cart
 */
router.post('/cart/items', routesVersioning({
  '^1.0.0': ctrl.createCartItem,
}));

/**
 * Delete an item of the cart
 */
router.delete('/cart/items/:id', routesVersioning({
  '^1.0.0': ctrl.deleteCartItem,
}));

/**
 * Update the quantity of an item of the cart
 */
router.put('/cart/items/:id/quantity', routesVersioning({
  '^1.0.0': ctrl.updateCartItemQuantity,
}));

/**
 * Checkout the items for the payment
 * (in our POC this will update article's stocks and empty the cart)
 */
router.put('/cart/checkout', routesVersioning({
  '^1.0.0': ctrl.checkout,
}));

module.exports = router;
