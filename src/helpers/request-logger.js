const morgan = require('morgan');
const chalk = require('chalk');

const morganChalk = morgan((tokens, req, res) =>
  [
    chalk.bgGreen(tokens.method(req, res)),
    chalk.bgGreen(tokens.status(req, res)),
    chalk.bgGreen(tokens.url(req, res)),
    chalk.bgGreen(`${tokens['response-time'](req, res)} ms`),
  ].join(' '));

module.exports = morganChalk;
