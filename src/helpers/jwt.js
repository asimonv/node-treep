require('dotenv').config();
const expressJwt = require('express-jwt');

async function isRevoked(req, payload, done) {
  // revoke token if user no longer exists
  if (!payload.sub) {
    return done(null, true);
  }

  return done();
}

function jwt() {
  const secret = process.env.JWT_SECRET;
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      '/api/auth/',
    ],
  });
}

module.exports = jwt;
