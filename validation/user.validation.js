const Joi = require("joi");

const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]*)(?=.*[!@#$%^&*_-])(?=.{8,})");
module.exports = {
  create: Joi.object({
    email: Joi.string().email(),
    username: Joi.string(),
    phone: Joi.object({
      countryCode: Joi.number().greater(0).required(),
      localFormat: Joi.string().min(6).required(),
    }),
    password: Joi.string().pattern(passwordRegex).max(70).messages({
      "string.pattern.match": '"password" must be stronger',
    }).required(),
    confirm_password: Joi.any().equal(Joi.ref("password")).messages({ "any.only": "{{#label}} does not match" }),
    sportInterest: Joi.string().min(2).optional(),
  })
    .with("password", "confirm_password"),


  login: Joi.object({
    email: Joi.string().email(),
    phoneNumber: Joi.object({
      countryCode: Joi.number().greater(0).required(),
      localFormat: Joi.string().min(6).required(),
    }),
    password: Joi.string().required().max(70),
  }).xor("email", "phoneNumber"),

  verify: Joi.object({
    token: Joi.string().required(),
    phone: Joi.object({
      countryCode: Joi.number().greater(0).required(),
      localFormat: Joi.string().min(6).required(),
    }),
    otp: Joi.number().required()
  }),
  
  reset: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().max(70)
  }),
  
  update: Joi.object({
    email: Joi.string().email(),
    username: Joi.string(),
    password: Joi.string().pattern(passwordRegex).max(70).messages({
      "string.pattern.match": '"password" must be stronger',
    }),
  })
};
