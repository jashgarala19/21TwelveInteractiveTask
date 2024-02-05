import Joi from "joi";

export default Joi.object({
  firstName: Joi.string().required().messages({
    "any.required": "First Name is required.",
  }),
  lastName: Joi.string(),
  userName: Joi.string().required().messages({
    "any.required": "User Name is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address.",
    "any.required": "Email is required.",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required.",
  }),
});
