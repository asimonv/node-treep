/* eslint no-console: ["error", { allow: ["log", "error"] }] */

const chalk = require('chalk');

function logErrors(err, req, res, next) {
  if (err) {
    console.log(chalk.bgYellow(`err -> ${JSON.stringify(err)}`));
  }
  next(err);
}

module.exports = logErrors;
