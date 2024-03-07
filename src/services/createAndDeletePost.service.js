const Sequelize = require('sequelize');
const config = require('../config/config');
const { BlogPost, Category, PostCategory } = require('../models');
const validatePostInputs = require('./validations/validatePostInputs');

const env = process.env.NODE_ENV;
const sequelize = new Sequelize(config[env]);

const findCategories = async (categoryIds) => {
  const categories = Promise.all(await categoryIds.map((id) => {
    const categoryFound = Category.findOne({ where: { id } });
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

  const t = await sequelize.transaction();
  try {
    const newPost = await BlogPost.create({ title, content, userId }, { transaction: t });

    await Promise.all(categoryIds.map((categoryId) => PostCategory
      .create({ postId: newPost.id, categoryId }, { transaction: t })));

    await t.commit();
    return { status: 'CREATED', data: newPost };
  } catch (e) {
    await t.rollback();
    return { status: 'BAD_REQUEST', data: { message: 'one or more "categoryIds" not found' } };
  }
};

const deleteBlogPost = async (id, userId) => {
  const post = await BlogPost.findOne({ where: { id } });
  if (!post) return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  if (post.userId !== userId) {
    return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } };
  }
  
  await BlogPost.destroy({ where: { id } });
  return { status: 'NO_CONTENT', data: null };
};

module.exports = {
  createBlogPost,
  deleteBlogPost,
};