const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
    const paramObjectJoiSchema = Joi.object({
    id: Joi.objectId().required().messages({
        "any.required": "Id params is required.",
        "string.base": "Id params must be a string.",
        "string.objectId": "Id must be a valid ObjectId.",
    }),
    });

export default paramObjectJoiSchema;
