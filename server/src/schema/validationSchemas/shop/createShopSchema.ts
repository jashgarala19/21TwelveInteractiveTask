const Joi = require("joi");

const shopJoiSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Shop name is required.",
    "string.base": "Shop name must be a string.",
  }),
  description: Joi.string().required().messages({
    "any.required": "Description is required.",
    "string.base": "Description must be a string.",
  }),
  location: Joi.string().required().messages({
    "any.required": "Location is required.",
    "string.base": "Location must be a string.",
  }),
  dateCreated: Joi.date().messages({
    "date.base": "Invalid date format for dateCreated.",
  }),
});

export default shopJoiSchema;
