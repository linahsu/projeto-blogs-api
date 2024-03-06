const { User } = require('../models');
const validateUserInputs = require('./validations/validateUserInputs');
const { findUserByEmail } = require('./login.service');
const tokenFunctions = require('../utils/tokenFunctions');

const findUserById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });
  return user;
};

const createUser = async (userData) => {
  const error = validateUserInputs(userData);
  if (error) return { status: error.status, data: { message: error.message } };

  const user = await findUserByEmail(userData.email);
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

const getUserById = async (id) => {
  const user = await findUserById(id);
  if (!user) return { status: 'NOT_FOUND', data: { message: 'User does not exist' } };

  return { status: 'SUCCESSFUL', data: user };
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};