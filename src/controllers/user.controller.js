const { userService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const createUser = async (req, res) => {
  const userData = req.body;
  const serviceResponse = await userService.createUser(userData);
  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
};

const getAllUsers = async (_req, res) => {
  const serviceResponse = await userService.getAllUsers();
  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const serviceResponse = await userService.getUserById(id);
  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};