const Joi = require("joi");

const passwordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]*)(?=.*[!@#$%^&*_-])(?=.{8,})"
);
module.exports = {
  create: Joi.object({
    email: Joi.string().email(),
    username: Joi.string(),
    phone: Joi.object({
      countryCode: Joi.number().greater(0).required(),
      localFormat: Joi.string().min(6).required(),
    }),
    password: Joi.string()
      .pattern(passwordRegex)
      .max(70)
      .messages({
        "string.pattern.match": '"password" must be stronger',
        "string.pattern.base":
          'The "password" must meet the specified criteria: at least one lowercase letter, one uppercase letter, one digit, one special character, and a minimum length of 8 characters.',
      })
      .required(),
    confirm_password: Joi.any()
      .equal(Joi.ref("password"))
      .messages({ "any.only": "{{#label}} does not match" }),
    sportInterest: Joi.string().min(2).optional(),
  }).with("password", "confirm_password"),

  login: Joi.object({
    email: Joi.string().email(),
    phone: Joi.object({
      countryCode: Joi.number().greater(0).required(),
      localFormat: Joi.string().min(6).required(),
    }),
    password: Joi.string()
    .pattern(passwordRegex)
    .max(70)
    .messages({
      "string.pattern.match": '"password" must be stronger',
      "string.pattern.base":
        'The "password" must meet the specified criteria: at least one lowercase letter, one uppercase letter, one digit, one special character, and a minimum length of 8 characters.',
    })
    .required(),
  }).xor("email", "phone"),

  verify: Joi.object({
    token: Joi.string().required(),
    phone: Joi.object({
      countryCode: Joi.number().greater(0).required(),
      localFormat: Joi.string().min(6).required(),
    }),
    otp: Joi.number().required(),
  }),

  reset: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
    .pattern(passwordRegex)
    .max(70)
    .messages({
      "string.pattern.match": '"password" must be stronger',
      "string.pattern.base":
        'The "password" must meet the specified criteria: at least one lowercase letter, one uppercase letter, one digit, one special character, and a minimum length of 8 characters.',
    })
    .required(),
  }),

  update: Joi.object({
    email: Joi.string().email(),
    username: Joi.string(),
    password: Joi.string()
    .pattern(passwordRegex)
    .max(70)
    .messages({
      "string.pattern.match": '"password" must be stronger',
      "string.pattern.base":
        'The "password" must meet the specified criteria: at least one lowercase letter, one uppercase letter, one digit, one special character, and a minimum length of 8 characters.',
    })
    .required(),
  }),
};
