import * as Joi from 'joi'

export const JoiValidationSchema = Joi.object({
    PORT: Joi.number().default(8000),
    MONGODB_CONNECTION_STRING: Joi.required(),
    MONGODB_CONNECTION_STRING_LOCAL: Joi.optional().default('mongodb://localhost:27017/test'),
    MONGODB_DATABASE: Joi.string().default('test'),
    JWT_SECRET: Joi.required(),
    DEFAULT_LIMIT: Joi.number().default(30),
})