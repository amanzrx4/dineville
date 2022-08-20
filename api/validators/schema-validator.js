const Joi = require("joi");

const categorySchemaValidator = Joi.object({
  name: Joi.string().required().min(5).max(50),
});

const dishSchemaValidator = Joi.object({
  name: Joi.string().required().min(5).max(50),
  description: Joi.string().required().min(10).max(150),
  price: Joi.number().required(),
  category: Joi.string().required(),
});

module.exports = { categorySchemaValidator, dishSchemaValidator };
