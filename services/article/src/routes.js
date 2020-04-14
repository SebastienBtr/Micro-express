const express = require('express');
const routesVersioning = require('express-routes-versioning')();

const router = express.Router();
const ctrl = require('./controllers');

/**
 * Health of the service
 */
router.get('/health', (req, res) => res.status(200).send({ message: 'ok' }));

/**
 * Get all the articles
 */
router.get('/articles', routesVersioning({
  '^1.0.0': ctrl.getAllArticles,
}));

/**
 * Get a specific article
 */
router.get('/articles/:id', routesVersioning({
  '^1.0.0': ctrl.getArticleById,
}));

/**
 * Update a specific article
 */
router.put('/articles/:id', routesVersioning({
  '^1.0.0': ctrl.updateArticle,
}));

/**
 * Create an article
 */
router.post('/articles', routesVersioning({
  '^1.0.0': ctrl.createArticle,
}));

/**
 * Delete a specific article
 */
router.delete('/articles/:id', routesVersioning({
  '^1.0.0': ctrl.deleteArticle,
}));

module.exports = router;
