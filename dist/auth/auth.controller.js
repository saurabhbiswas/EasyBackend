"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const user_service_1 = require("../users/user.service");
const login_dto_1 = require("./dto/login.dto");
const signup_dto_1 = require("./dto/signup.dto");
const refresh_dto_1 = require("./dto/refresh.dto");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async login(body, res) {
        const { email, password } = body;
        const user = await this.userService.findByEmail(email);
        if (!user) {
            return res.status(common_1.HttpStatus.UNAUTHORIZED).json({ message: 'Invalid credentials' });
        }
        const validUser = await this.authService.validateUser(email, password, user);
        if (!validUser) {
            return res.status(common_1.HttpStatus.UNAUTHORIZED).json({ message: 'Invalid credentials' });
        }
        const tokens = await this.authService.login(user);
        return res.status(common_1.HttpStatus.OK).json(tokens);
    }
    async signup(body, res) {
        const { email, password, name } = body;
        const existingUser = await this.userService.findByEmail(email);
        if (existingUser) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: 'User already exists' });
        }
        const newUser = await this.userService.createUser(email, name, password);
        return res.status(common_1.HttpStatus.CREATED).json({ message: 'User created successfully' });
    }
    async refresh(body, res) {
        const { refreshToken } = body;
        const newAccessToken = await this.authService.refreshToken(refreshToken);
        if (!newAccessToken) {
            return res.status(common_1.HttpStatus.UNAUTHORIZED).json({ message: 'Invalid refresh token' });
        }
        return res.status(common_1.HttpStatus.OK).json(newAccessToken);
    }
};
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignupDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_dto_1.RefreshDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map