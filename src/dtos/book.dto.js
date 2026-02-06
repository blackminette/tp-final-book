const Joi = require("joi");


const bookCreateSchema = Joi.object({
    title: Joi.string().min(2).required(),
    description: Joi.string().min(10).required(),
    author: Joi.string().min(2).required(),
    year: Joi.number().integer().min(0).max(new Date().getFullYear()),
    genre: Joi.string().min(2),
    isbn: Joi.string().min(8),
    userId: Joi.number().integer().required()
});

const bookUpdateSchema = Joi.object({
    title: Joi.string().min(2),
    description: Joi.string().min(10),
    author: Joi.string().min(2),
    year: Joi.number().integer().min(0).max(new Date().getFullYear()),
    genre: Joi.string().min(2),
    isbn: Joi.string().min(8),
    userId: Joi.number().integer()
});

module.exports = {
    bookCreateSchema,
    bookUpdateSchema
};