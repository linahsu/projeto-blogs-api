const schema = require('./schemas');

module.exports = (updatePostData) => {
  const { error } = schema.postSchema.validate(updatePostData);
  if (error) return { status: 'BAD_REQUEST', message: error.message };
};