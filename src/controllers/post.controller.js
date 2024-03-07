const { createAndDeletePost, otherPostService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const createBlogPost = async (req, res) => {
  const postData = req.body;
  const { userId } = req.locals;
  const serviceResponse = await createAndDeletePost.createBlogPost(postData, userId);
  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
};

const getAllBlogPosts = async (_req, res) => {
  const serviceResponse = await otherPostService.getAllBlogPosts();
  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
};

const getBlogPostByQuery = async (req, res) => {
  const { q } = req.query;
  const serviceResponse = await otherPostService.getBlogPostByQuery(q);
  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
};

const getBlogPostById = async (req, res) => {
  const { id } = req.params;
  const serviceResponse = await otherPostService.getBlogPostById(id);
  if (serviceResponse.status !== 'NO_CONTENT') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
  return res.status(mapStatusHTTP(serviceResponse.status)).end();
};

const updateBlogPost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.locals;
  const updatePostData = req.body;
  const serviceResponse = await otherPostService.updateBlogPost(id, userId, updatePostData);
  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
};

const deleteBlogPost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.locals;
  const serviceResponse = await createAndDeletePost.deleteBlogPost(id, userId);
  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostByQuery,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
};