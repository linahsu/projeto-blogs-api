const { createPostService, otherPostService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const createBlogPost = async (req, res) => {
  const postData = req.body;
  const { userId } = req.locals;
  const serviceResponse = await createPostService.createBlogPost(postData, userId);
  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
};

const getAllBlogPosts = async (_req, res) => {
  const serviceResponse = await otherPostService.getAllBlogPosts();
  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
};

const getBlogPostById = async (req, res) => {
  const { id } = req.params;
  const serviceResponse = await otherPostService.getBlogPostById(id);
  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
};

const updateBlogPost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.locals;
  const updatePostData = req.body;
  const serviceResponse = await otherPostService.updateBlogPost(id, userId, updatePostData);
  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
};