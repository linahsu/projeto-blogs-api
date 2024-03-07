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

const insertPostCategory = async (userId, postData) => {
  const t = await sequelize.transaction();
  const { title, content, categoryIds } = postData;

  try {
    const newPost = await BlogPost.create({ title, content, userId }, { transaction: t });

    Promise.all(await categoryIds.map((categoryId) => PostCategory
      .create({ postId: newPost.id, categoryId }, { transaction: t })));

    await t.commit();
    return newPost;
  } catch (e) {
    await t.rollback;
    return { message: e.message };
  }
};

const createBlogPost = async (postData, userId) => {
  const error = validatePostInputs(postData);
  if (error) return { status: error.status, data: { message: error.message } };

  const categories = await findCategories(postData.categoryIds);
  if (categories.includes(undefined)) {
    return { status: 'BAD_REQUEST', data: { message: 'one or more "categoryIds" not found' } };
  }

  const newPost = insertPostCategory(userId, postData);
  if (newPost.message) return { status: 'NOT_IMPLEMENTED', data: newPost };
  return { status: 'CREATED', data: newPost };
};

module.exports = {
  createBlogPost,
};