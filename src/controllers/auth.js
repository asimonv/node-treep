require('dotenv').config();

const jwt = require('jsonwebtoken');
const request = require('request-promise').defaults({ jar: true });
const bcrypt = require('bcrypt');
const chalk = require('chalk');

const authUser = async ({ email, password }) => {
  const username = email.split('@')[0];
  const form = {
    login: username,
    passwd: password,
    sw: '',
    sh: '',
    cd: '',
  };

  const options = {
    resolveWithFullResponse: true,
    uri: 'https://intrawww.ing.puc.cl/siding/index.phtml',
    form,
  };

  const res = await request.post(options);

  const cookie = res.headers['set-cookie']; // .replace("; path=/", "");
  const isValid = cookie && cookie[0].indexOf('SIDING_SESSID') > -1;
  if (!isValid) {
    const notValidMessage = {
      error: 'Request not valid',
    };
    throw notValidMessage;
  }

  const authOptions = {
    uri: 'https://intrawww.ing.puc.cl/siding',
    resolveWithFullResponse: true,
  };

  const auth = await request.get(authOptions);

  const isLogged = auth.body.indexOf('passwd') === -1;

  if (!isLogged) {
    const notLoggedMessage = {
      error: 'Wrong email-password combination',
    };
    throw notLoggedMessage;
  } else {
    const hashedUsername = await bcrypt.hash(username, 10);
    const token = jwt.sign({ sub: hashedUsername }, process.env.JWT_SECRET);
    console.log(chalk.bgGreen(token));
    return token;
  }
};

module.exports = {
  authUser,
};
