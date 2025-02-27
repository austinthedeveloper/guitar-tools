import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from '../services/users.service';
import { AuthUser } from '../models';

@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    return { message: 'Redirecting to Google...' };
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request & { user: AuthUser }) {
    const user: AuthUser = req.user; // Now correctly typed as AuthUser

    // Generate JWT
    const payload = { sub: user._id, email: user.email };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });

    return { user, accessToken };
  }
}
