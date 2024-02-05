const Joi = require("joi");

const updateShopJoiSchema = Joi.object({
  name: Joi.string().messages({
    "any.required": "Shop name is required.",
    "string.base": "Shop name must be a string.",
  }),
  description: Joi.string().messages({
    "any.required": "Description is required.",
    "string.base": "Description must be a string.",
  }),
  location: Joi.string().messages({
    "any.required": "Location is required.",
    "string.base": "Location must be a string.",
  }), 
});

export default updateShopJoiSchema;
