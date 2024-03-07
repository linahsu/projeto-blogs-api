const Sequelize = require('sequelize');
const config = require('../config/config');
const { BlogPost, Category, PostCategory } = require('../models');
const validatePostInputs = require('./validations/validatePostInputs');

const env = process.env.NODE_ENV;
const sequelize = new Sequelize(config[env]);

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
  const t = await sequelize.transaction();
  const { title, content, categoryIds } = postData;

  const error = validatePostInputs(postData);
  if (error) return { status: error.status, data: { message: error.message } };

  const categories = await findCategories(categoryIds);
  if (categories.includes(undefined)) {
    return { status: 'BAD_REQUEST', data: { message: 'one or more "categoryIds" not found' } };
  }

  try {
    const newPost = await BlogPost.create({ title, content, userId }, { transaction: t });

    Promise.all(await categoryIds.map((categoryId) => PostCategory
      .create({ postId: newPost.id, categoryId }, { transaction: t })));

    await t.commit();
    return { status: 'CREATED', data: newPost };
  } catch (e) {
    await t.rollback;
    return { status: 'NOT_IMPLEMENTED', data: { message: e.message } };
  }
};

module.exports = {
  createBlogPost,
};