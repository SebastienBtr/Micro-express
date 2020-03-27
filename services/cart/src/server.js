const express = require('express');
const bodyParser = require('body-parser');
const winston = require('winston');
const routes = require('./routes');

const app = express();

/**
 * Add headers
 */
app.use((req, res, next) => {
  // Hosts you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

/**
 * Configure app to use bodyParser
 * This will let us get the data from a POST
 */
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(bodyParser.json());

/**
 * Configure winston
 */
winston.add(new winston.transports.Console({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
  ),
}));

/**
 * Register our routes
 */
app.use(routes);

module.exports = app;
