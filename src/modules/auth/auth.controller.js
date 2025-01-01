const { authService } = require("./auth.service");

class AuthController {
    async register(req, res, next) {
        try {
            const body = req.body;
            const data = await authService.register(body);
            console.log(data);
            
            res.status(data.statusCode).json(data);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const body = req.body;
            const data = await authService.login(body);
            res.status(data.statusCode).json(data);
        } catch (error) {
            next(error);
        }
    }

    async refreshToken(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const data = await authService.refreshToken(refreshToken);
            res.status(data.statusCode).json(data);
        } catch (error) {
            next(error);
        }
    }
}

const authController = new AuthController();
module.exports = { authController };
