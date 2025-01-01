const {Router} = require("express")
const {Userrouter} = require("./user/user.routes")
const {authRouter} = require("./auth/auth.routes")
const router = Router()

router.use("/auth", authRouter)
router.use("/user", Userrouter)


module.exports = {router}
