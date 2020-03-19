const express = require('express');
const bodyParser = require('body-parser');
const winston = require('winston');
const routes = require('./routes');
require('dotenv').config();

const app = express();
const port = process.env.SERVER_PORT || 3500;


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

/**
 * Start the server
 */
app.listen(port, () => {
  winston.info(`Server is running on: http://localhost:${port}`);
});
