require("dotenv").config()

const config = {
    PORT:process.env.PORT,
    URL:process.env.DB_URL,
    SECRET_ACC_KEY:process.env.SECRET_ACC_KEY,
    SECRET_REF_KEY:process.env.SECRET_REF_KEY,
    TOKEN_ACC_TIME:process.env.TOKEN_ACC_TIME,
    TOKEN_REF_TIME:process.env.TOKEN_REF_TIME,
}


module.exports = {config}