const { BlogPost, Category, User } = require('../models');
const validateUpdatePostInputs = require('./validations/validateUpdatePostInputs');

const findBlogPost = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return post;
};

const getAllBlogPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { status: 'SUCCESSFUL', data: posts };
};

const getBlogPostById = async (id) => {
  const post = await findBlogPost(id);
  if (!post) return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  return { status: 'SUCCESSFUL', data: post };
};

const updateBlogPost = async (id, userId, updatePostData) => {
  const error = validateUpdatePostInputs(updatePostData);
  if (error) return { status: error.status, data: { message: error.message } };

  const post = await findBlogPost(id);
  if (!post) return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };

  if (post.userId !== userId) {
    return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } };
  }

  await BlogPost.update(updatePostData, { where: { id } });
  const updatedPost = await findBlogPost(id);
  return { status: 'SUCCESSFUL', data: updatedPost };
};

module.exports = {
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
};