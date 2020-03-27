const express = require('express');
const winston = require('winston');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const app = express();
const port = 3500;

/**
 * Add headers
 */
app.use((req, res, next) => {
  // Hosts you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

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
 * Disable the "try it out" button in swagger
 */
const DisableTryItOutPlugin = () => ({
  statePlugins: {
    spec: {
      wrapSelectors: {
        allowTryItOutFor: () => () => false,
      },
    },
  },
});

/**
 * Swagger options
 */
const options = {
  explorer: true,
  swaggerOptions: {
    plugins: [
      DisableTryItOutPlugin,
    ],
    urls: [
      {
        url: `http://localhost:${port}/article-swagger.json`,
        name: 'Article',
      },
      {
        url: `http://localhost:${port}/cart-swagger.json`,
        name: 'Cart',
      },
    ],
  },
  customCss: '.swagger-ui .topbar .link { display: none }',
};

/**
 * Swagger documentation
 */
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(null, options));

/**
 * Expose swagger static files
 */
app.use(express.static('swagger'));

/**
 * Start the server
 */
app.listen(port, () => {
  winston.info(`Server is running on: http://localhost:${port}`);
});
