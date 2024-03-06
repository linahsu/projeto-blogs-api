const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().required()
    .messages({
      'string.empty': 'Some required fields are missing',
      'string.required': 'Some required fields are missing',
    }),
  password: Joi.string().required()
    .messages({
      'string.empty': 'Some required fields are missing',
      'string.required': 'Some required fields are missing',
    }),
});

const userSchema = Joi.object({
  displayName: Joi.string().min(8),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  image: Joi.string(),
});

module.exports = {
  loginSchema,
  userSchema,
};