const Joi = require("joi");

const userSignUpSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

const userSignInSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

module.exports = {
    userSignUpSchema,
    userSignInSchema
}