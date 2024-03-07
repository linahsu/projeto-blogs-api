const Joi = require('joi');

const errorMessage = 'Some required fields are missing';

const loginSchema = Joi.object({
  email: Joi.string().required()
    .messages({ 'string.empty': errorMessage, 'string.required': errorMessage }),
  password: Joi.string().required()
    .messages({ 'string.empty': errorMessage, 'string.required': errorMessage }),
});

const userSchema = Joi.object({
  displayName: Joi.string().min(8),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  image: Joi.string(),
});

const categorySchema = Joi.object({
  name: Joi.string().min(1).required(),
});

const postSchema = Joi.object({
  title: Joi.string().min(1).required()
    .messages({ 'string.empty': errorMessage, 'string.required': errorMessage }),
  content: Joi.string().min(1).required()
    .messages({ 'string.empty': errorMessage, 'string.required': errorMessage }),
  categoryIds: Joi.array().required()
    .messages({ 'string.empty': errorMessage, 'string.required': errorMessage }),
});

const updatePostSchema = Joi.object({
  title: Joi.string().min(1).required()
    .messages({ 'string.empty': errorMessage, 'string.required': errorMessage }),
  content: Joi.string().min(1).required()
    .messages({ 'string.empty': errorMessage, 'string.required': errorMessage }),
});

module.exports = {
  loginSchema,
  userSchema,
  categorySchema,
  postSchema,
  updatePostSchema,
};