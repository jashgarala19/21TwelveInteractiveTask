const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const addProductJoiSchema = Joi.object({
  shopId: Joi.objectId().required().messages({
    "any.required": "ShopId is required.",
    "string.base": "ShopId must be a string.",
    "string.objectId": "ShopId must be a valid ObjectId.",
  }),
  product: Joi.object({
    name: Joi.string().required().messages({
      "any.required": "Product name is required.",
      "string.base": "Product name must be a string.",
    }),
    description: Joi.string().messages({
      "string.base": "Product description must be a string.",
    }),
    price: Joi.number().required().messages({
      "any.required": "Product price is required.",
      "number.base": "Product price must be a number.",
    }),
  })
    .required()
    .messages({
      "any.required": "Product details are required.",
    }),
});

export default addProductJoiSchema;
