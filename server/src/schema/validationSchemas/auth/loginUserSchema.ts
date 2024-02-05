import Joi from "joi";

export default Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address.",
    "any.required": "Email is required.",
    "string.empty": "Email cannot be empty.",
  }),
  password: Joi.string().min(1).required().messages({
    "any.required": "Password is required.",
    "string.empty": "Password cannot be empty.",
  }),
});
