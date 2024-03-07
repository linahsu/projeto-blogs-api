const schema = require('./schemas');

module.exports = (postData) => {
  const { error } = schema.updatePostSchema.validate(postData);
  if (error) return { status: 'BAD_REQUEST', message: error.message };
};