import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { RefreshDto } from './dto/refresh.dto';
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    login(body: LoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
    signup(body: SignupDto, res: Response): Promise<Response<any, Record<string, any>>>;
    refresh(body: RefreshDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
