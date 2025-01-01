const { CustomError } = require("./customError")

async function validate(schema, config) {
    const {error} = await schema.validate(config)

    if (error) {
        throw new CustomError(500, error)
    }
}

module.exports = {validate}