const { Category } = require('../models');
const validateCategoryInputs = require('./validations/validateCategoryInputs');

const createCategory = async (categoryData) => {
  const error = validateCategoryInputs(categoryData);
  if (error) return { status: error.status, data: { message: error.message } };

  const newCategory = await Category.create(categoryData);
  return { status: 'CREATED', data: newCategory };
};

module.exports = {
  createCategory,
};