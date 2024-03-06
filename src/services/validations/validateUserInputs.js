const schema = require('./schemas');

module.exports = (userData) => {
  const { error } = schema.userSchema.validate(userData);
  if (error) return { status: 'BAD_REQUEST', message: error.message };
};