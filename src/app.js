const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require("./routes");
const jwt = require("./helpers/jwt");
const errorLogger = require("./helpers/error-logger");
const errorHandler = require("./helpers/error-handler");
const requestLogger = require("./helpers/request-logger");

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

app.options(
  "*",
  cors({
    origin: "http://localhost:3000",
  })
); // include before other routes

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Routing middleware
app.use("/api", routes);

// Error logging
app.use(errorLogger);
app.use(errorHandler);

module.exports = app;
