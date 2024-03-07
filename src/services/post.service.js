const { BlogPost, Category } = require('../models');
const validatePostInputs = require('./validations/validatePostInputs');

const findCategories = async (categoryIds) => {
  const categories = Promise.all(await categoryIds.map((id) => {
    const categoryFound = Category.findOne({
      where: { id },
    });
    return categoryFound;
  }));

  return categories;
};

const createBlogPost = async (postData, userId) => {
  const { title, content, categoryIds } = postData;

  const error = validatePostInputs(postData);
  if (error) return { status: error.status, data: { message: error.message } };

  const categories = await findCategories(categoryIds);
  if (categories.includes(undefined)) {
    return { status: 'BAD_REQUEST', data: { message: 'one or more "categoryIds" not found' } };
  }

  const newPost = await BlogPost.create({ title, content, userId });
  return { status: 'CREATED', data: newPost };
};

module.exports = {
  createBlogPost,
};