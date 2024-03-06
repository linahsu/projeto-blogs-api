const schema = require('./schemas');

module.exports = (loginData) => {
  const { error } = schema.loginSchema.validate(loginData);
  if (error) return { status: 'BAD_REQUEST', message: error.message };
};