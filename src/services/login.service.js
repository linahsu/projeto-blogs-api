const jwt = require('jsonwebtoken');
const { User } = require('../models');
const validateLoginInputs = require('./validations/validateLoginInputs');

const secret = process.env.JWT_SECRET;

const findUser = async (email) => {
  const user = await User.findOne({
    where: { email },
  });
  return user;
};

const crateToken = (payload) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

const login = async (loginData) => {
  const error = validateLoginInputs(loginData);
  if (error) return { status: error.status, data: { message: error.message } };

  const { email, password } = loginData;

  const user = await findUser(email);
  if (!user || user.password !== password) {
    return { status: 'BAD_REQUEST', data: { message: 'Invalid fields' } };
  }

  const payload = {
    userId: user.id,
  };
  const token = crateToken(payload);

  return { status: 'SUCCESSFUL', data: { token } };
};

module.exports = {
  login,
};
