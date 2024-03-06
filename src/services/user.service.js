const { User } = require('../models');
const validateUserInputs = require('./validations/validateUserInputs');
const { findUser } = require('./login.service');
const tokenFunctions = require('../utils/tokenFunctions');

const createUser = async (userData) => {
  const error = validateUserInputs(userData);
  if (error) return { status: error.status, data: { message: error.message } };

  const user = await findUser(userData.email);
  console.log(user);
  if (user) return { status: 'CONFLICT', data: { message: 'User already registered' } };

  const newUser = await User.create(userData);

  const payload = { userId: newUser.id };
  const token = tokenFunctions.createToken(payload);

  return { status: 'CREATED', data: { token } };
};

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  console.log(users);
  return { status: 'SUCCESSFUL', data: users };
};

module.exports = {
  createUser,
  getAllUsers,
};