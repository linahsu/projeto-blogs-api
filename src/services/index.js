const loginService = require('./login.service');
const userService = require('./user.service');
const categoryService = require('./category.service');
const createAndDeletePost = require('./createAndDeletePost.service');
const otherPostService = require('./otherPost.service');

module.exports = {
  loginService,
  userService,
  categoryService,
  createAndDeletePost,
  otherPostService,
};