const { Category } = require('../models');
const validateCategoryInputs = require('./validations/validateCategoryInputs');

const createCategory = async (categoryData) => {
  const error = validateCategoryInputs(categoryData);
  if (error) return { status: error.status, data: { message: error.message } };

  const newCategory = await Category.create(categoryData);
  return { status: 'CREATED', data: newCategory };
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return { status: 'SUCCESSFUL', data: categories };
};

module.exports = {
  createCategory,
  getAllCategories,
};