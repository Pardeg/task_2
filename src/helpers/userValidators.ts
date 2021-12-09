import Joi from 'joi';

export const userValidationSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().alphanum().required(),
    id: Joi.string().required(),
    age: Joi.number().min(4).max(130)
});

export const userDeleteValidationSchema = Joi.object({
    id: Joi.string().required()
});

export const userCreateValidationSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().alphanum().required(),
    age: Joi.number().min(4).max(130)
});

export const loginValidationSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().alphanum().required()
});
