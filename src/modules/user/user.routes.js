const { Router } = require("express")
const { user_controller } = require("./user.controller")

const Userrouter = Router()

Userrouter.get("/", user_controller.getAll.bind(user_controller))


module.exports = { Userrouter }
