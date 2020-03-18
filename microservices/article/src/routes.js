const express = require('express');

const router = express.Router();
const ctrl = require('./controllers');

/**
 * Health of the service
 */
router.get('/health', (req, res) => res.status(200).send());

/**
 * Get all the articles
 */
router.get('/articles', ctrl.getAllArticles);

/**
 * Create an article
 */
router.post('/articles', ctrl.createArticle);

/**
 * Update an article
 */
router.put('/articles/:id', ctrl.updateArticle);

/**
 * Get an article by id
 */
router.get('/articles/:id', ctrl.getArticleById);

/**
 * Delete an article
 */
router.delete('/articles/:id', ctrl.deleteArticle);

module.exports = router;
