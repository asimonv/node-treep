const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const jwt = require('./helpers/jwt');
const errorLogger = require('./helpers/error-logger');
const errorHandler = require('./helpers/error-handler');
const requestLogger = require('./helpers/request-logger');

const app = express();

/**
 * Middlewares
 */

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// log requests
app.use(requestLogger);

// use JWT auth to secure the api
app.use(jwt());

// Routing middleware
app.use('/api', routes);

// Error logging
app.use(errorLogger);
app.use(errorHandler);

module.exports = app;
