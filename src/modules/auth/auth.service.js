const { UserModel } = require("../user/entity/user.entity");
const { bcryptInstance } = require("../../lib/bcrypt");
const { jwtInstance } = require("../../lib/jwt");
const { ResData } = require("../../lib/resData");
const { CustomError } = require("../../lib/customError");

class AuthService {
    async register(dto) {
        console.log(dto);
        
        const { name, phone, password } = dto;
    
        const existingUser = await UserModel.findOne({ phone });
        
        if (existingUser) {
            throw new CustomError(400, "User already exists");
        }

        const hashedPassword = await bcryptInstance.hash(password);

        const newUser = await UserModel.create({
            fullName: name,
            phone,
            password: hashedPassword
        });

        return new ResData(201, "User registered successfully", {
            id: newUser._id,
            name: newUser.fullName,
            phone: newUser.phone,
        });
    }

    async login(dto) {
        const { phone, password } = dto;

        const user = await UserModel.findOne({ phone });
        if (!user) {
            throw new CustomError(404, "User not found");
        }

        const isPasswordValid = await bcryptInstance.compare(password, user.password);
        if (!isPasswordValid) {
            throw new CustomError(401, "Invalid credentials");
        }

        const accessToken = jwtInstance.generateAccToken({ id: user._id, role: user.role });
        const refreshToken = jwtInstance.generateRefToken({ id: user._id });

        return new ResData(200, "Login successful", { accessToken, refreshToken });
    }

    async refreshToken(refreshToken) {
        const payload = jwtInstance.verifyRefToken(refreshToken);

        const accessToken = jwtInstance.generateAccToken({ id: payload.id, role: payload.role });
        const newRefreshToken = jwtInstance.generateRefToken({ id: payload.id });

        return new ResData(200, "Token refreshed", { accessToken, newRefreshToken });
    }
}

const authService = new AuthService();
module.exports = { authService };
