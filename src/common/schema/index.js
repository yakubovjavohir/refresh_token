const joi = require("joi")

const keySchema = joi.object({
    PORT: joi.number().min(1000).max(9999).required(),
    URL: joi.string().required(),
    SECRET_ACC_KEY: joi.string().required(),
    SECRET_REF_KEY: joi.string().required(),
    TOKEN_ACC_TIME: joi.number().required(),
    TOKEN_REF_TIME: joi.number().required()
})

module.exports = {keySchema}