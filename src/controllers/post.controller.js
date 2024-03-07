const { postService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const createBlogPost = async (req, res) => {
  const postData = req.body;
  const { userId } = req.locals;
  const serviceResponse = await postService.createBlogPost(postData, userId);
  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
};

module.exports = {
  createBlogPost,
};