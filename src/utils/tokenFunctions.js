const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const createToken = (payload) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

const verifyToken = (token) => {
  const payload = jwt.verify(token, secret);
  return payload;
};

module.exports = {
  createToken,
  verifyToken,
};
