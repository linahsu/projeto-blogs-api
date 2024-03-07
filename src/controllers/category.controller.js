const { categoryService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const createCategory = async (req, res) => {
  const categoryData = req.body;
  const serviceResponse = await categoryService.createCategory(categoryData);
  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
};

module.exports = {
  createCategory,
};