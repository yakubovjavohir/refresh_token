const { UserModel } = require("./entity/user.entity")
const { ResData } = require("../../lib/resData")
const {bcryptInstance} = require("../../lib/bcrypt")
class UserService {
    #userservice
    constructor(userservice) {
        this.#userservice = userservice
    }

    async findData() {
        const data = await this.#userservice.find()
        const resdata = new ResData(200, "success", data)
        return resdata
    }
}

const userService = new UserService(UserModel)
module.exports = { userService }
