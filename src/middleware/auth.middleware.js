const { CustomError } = require("../lib/customError");
const { jwtInstance } = require("../lib/jwt");
const { user_service } = require("../modules/user/user.service");

class AuthMiddlwares {
    #jwt;
    #userservice;

    constructor(jwt, userservice) {
        this.#jwt = jwt;
        this.#userservice = userservice;
    }

    
    async verifyToken(req, res, next) {
        try {
            const token = req.headers.authorization;
    
            if (!token) {
                throw new CustomError(401, "No token provided");
            }
    
            const [type, tokenValue] = token.split(" ");
    
            if (type !== "Bearer") {
                throw new CustomError(401, "Invalid token type");
            }
            
            console.log(tokenValue.data);
            
            const payload = this.#jwt.verifyAccToken(tokenValue);
            console.log("Decoded Payload:", payload.user);
    
            if (!payload || !payload.id) {
                throw new CustomError(401, "Invalid or expired token");
            }

            const user = await this.#userservice.getUserById(payload.id);
            if (!user) {
                throw new CustomError(404, "User not found");
            }
    
            req.currentUser = user;
            next();
        } catch (error) {
            next(error);
        }
    }
    
}

const auth_middlwares = new AuthMiddlwares(jwtInstance, user_service);

module.exports = { auth_middlwares };
