const { Router } = require("express");
const { authController } = require("./auth.controller");

const authRouter = Router();

authRouter.post("/register", authController.register.bind(authController));

authRouter.post("/login", authController.login.bind(authController));

authRouter.post("/refresh", authController.refreshToken.bind(authController));

module.exports = { authRouter };
