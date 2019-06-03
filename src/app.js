const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const chalk = require('chalk');

const routes = require('./routes');
const jwt = require('./helpers/jwt');
const errorLogger = require('./helpers/error-logger');
const errorHandler = require('./helpers/error-handler');

const app = express();

/**
 * Middlewares
 */

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// log requests
app.use(morgan('combined'));

// use JWT auth to secure the api
app.use(jwt());

app.use((req, res, next) => {
  console.log(chalk.bgMagenta(JSON.stringify(req.user)));
  next();
});

// Routing middleware
app.use('/api', routes);

// Error logging
app.use(errorLogger);
app.use(errorHandler);

module.exports = app;
