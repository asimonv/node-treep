/* eslint no-console: ["error", { allow: ["log"] }] */

require("dotenv").config();

const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const chalk = require("chalk");
const Boom = require("@hapi/boom");

const authUser = async ({ username, password }) => {
  const cleanedUsername = username.split("@")[0].trim();
  const form = {
    login: cleanedUsername,
    passwd: password,
    sw: "",
    sh: "",
    cd: "",
  };

  const options = {
    resolveWithFullResponse: true,
    uri: "https://intrawww.ing.puc.cl/siding/index.phtml",
    form,
  };

  const res = await fetch.post(options);

  const cookie = res.headers.raw()["content-length"]; // .replace("; path=/", "");
  const isValid = cookie === "3419";

  if (!isValid) {
    throw Boom.unauthorized("Wrong email-password combination");
  }

  // const authOptions = {
  //   uri: 'https://intrawww.ing.puc.cl/siding',
  //   resolveWithFullResponse: true,
  // };
  //
  // const auth = await request.get(authOptions);

  // const isLogged = auth.body.indexOf('passwd') === -1;
  //
  // if (!isLogged) {
  //   throw Boom.unauthorized('Wrong email-password combination');
  // }
  console.log(chalk.bgMagenta(username));
  const token = jwt.sign({ sub: cleanedUsername }, process.env.JWT_SECRET);
  console.log(chalk.bgGreen(token));
  return token;
};

const logoutUser = async () => {
  const options = {
    resolveWithFullResponse: true,
    uri: "https://intrawww.ing.puc.cl/siding/logout.phtml",
  };

  const res = await request.get(options);
  console.log(chalk.bgGreen(res));
  return res;
};

module.exports = {
  authUser,
  logoutUser,
};
