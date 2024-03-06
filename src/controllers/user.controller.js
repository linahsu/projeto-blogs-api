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

module.exports = {
  createUser,
  getAllUsers,
};