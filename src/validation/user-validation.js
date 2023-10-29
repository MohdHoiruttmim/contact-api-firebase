const Joi = require("joi");

const registerUserValidation = Joi.object({
  username: Joi.string().required().max(100),
  password: Joi.string().required().max(255),
  name: Joi.string().required().max(100),
});

module.exports = { registerUserValidation };