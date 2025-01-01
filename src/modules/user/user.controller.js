const { userService } = require("./user.service")
const { jwtInstance } = require("../../lib/jwt")

class UserController {
    #userController
    constructor(userController) {
        this.#userController = userController
    }

    async getAll(req, res, next) {
        try {
            const data = await this.#userController.findData()
            res.status(data.statusCode).json(data)
        } catch (error) {
            next(error)
        }
    }
}

const user_controller = new UserController(userService)
module.exports = { user_controller }
