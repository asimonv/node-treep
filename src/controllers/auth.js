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

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(form)) {
    params.append(key, value);
  }

  const options = {
    method: "POST",
    body: params,
  };
  const res = await fetch(
    "https://intrawww.ing.puc.cl/siding/index.phtml",
    options
  );

  const { headers } = res;
  console.log(headers.get("content-length"));

  const cookie = headers.get("content-length"); // .replace("; path=/", "");
  const isValid = cookie === "6691";

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
  const res = await fetch("https://intrawww.ing.puc.cl/siding/logout.phtml");
  console.log(chalk.bgGreen(res));
  return res;
};

module.exports = {
  authUser,
  logoutUser,
};
