const schema = require('./schemas');

module.exports = (categoryData) => {
  const { error } = schema.categorySchema.validate(categoryData);
  if (error) return { status: 'BAD_REQUEST', message: error.message };
};