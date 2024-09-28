// src/auth/auth.controller.ts
import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { RefreshDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const { email, password } = body;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid credentials' });
    }

    const validUser = await this.authService.validateUser(email, password, user);
    if (!validUser) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid credentials' });
    }

    const tokens = await this.authService.login(user);
    return res.status(HttpStatus.OK).json(tokens);
  }

  @Post('signup')
  async signup(@Body() body: SignupDto, @Res() res: Response) {
    const { email, password, name } = body;
    const existingUser = await this.userService.findByEmail(email);

    if (existingUser) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'User already exists' });
    }

    const newUser = await this.userService.createUser(email, name, password);
    return res.status(HttpStatus.CREATED).json({ message: 'User created successfully' });
  }

  @Post('refresh')
  async refresh(@Body() body: RefreshDto, @Res() res: Response) {
    const { refreshToken } = body;
    const newAccessToken = await this.authService.refreshToken(refreshToken);
    if (!newAccessToken) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid refresh token' });
    }
    return res.status(HttpStatus.OK).json(newAccessToken);
  }
}
