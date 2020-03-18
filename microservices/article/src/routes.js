const express = require('express');
const routesVersioning = require('express-routes-versioning')();

const router = express.Router();
const ctrl = require('./controllers');

/**
 * Health of the service
 */
router.get('/health', (req, res) => res.status(200).send());

/**
 * Get all the articles
 */
router.get('/articles', routesVersioning({
  '^1.0.0': ctrl.getAllArticles,
}));

/**
 * Create an article
 */
router.post('/articles', routesVersioning({
  '^1.0.0': ctrl.createArticle,
}));

/**
 * Update an article
 */
router.put('/articles/:id', routesVersioning({
  '^1.0.0': ctrl.updateArticle,
}));

/**
 * Get an article by id
 */
router.get('/articles/:id', routesVersioning({
  '^1.0.0': ctrl.getArticleById,
}));

/**
 * Delete an article
 */
router.delete('/articles/:id', routesVersioning({
  '^1.0.0': ctrl.deleteArticle,
}));

module.exports = router;
