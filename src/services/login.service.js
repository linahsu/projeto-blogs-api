const { User } = require('../models');
const validateLoginInputs = require('./validations/validateLoginInputs');
const tokenFunctions = require('../utils/tokenFunctions');

const findUser = async (email) => {
  const user = await User.findOne({
    where: { email },
  });
  return user;
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
  const token = tokenFunctions.createToken(payload);

  return { status: 'SUCCESSFUL', data: { token } };
};

module.exports = {
  findUser,
  login,
};
