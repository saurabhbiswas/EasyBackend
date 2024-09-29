// src/auth/auth.controller.ts
import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { RefreshDto } from './dto/refresh.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Authentication') // Groups endpoints under "Authentication" tag
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

   @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'Successful login',
    schema: {
      example: {
        accessToken: 'jwt-access-token',
        refreshToken: 'jwt-refresh-token',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
    schema: {
      example: {
        message: 'Invalid credentials',
      },
    },
  })
 
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
  @ApiOperation({ summary: 'User signup' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    schema: {
      example: {
        message: 'User registered successfully',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'User already exists',
    schema: {
      example: {
        message: 'User already exists',
      },
    },
  })
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
