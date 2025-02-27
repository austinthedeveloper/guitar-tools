import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import { JwtAuthGuard } from '../guards';

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
  async googleAuthRedirect(
    @Req() req: Request & { user: any },
    @Res() res: Response
  ) {
    const user = req.user; // User object from Google
    const payload = { sub: user._id, email: user.email };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });

    // Redirect to frontend with token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:4200';
    return res.redirect(`${frontendUrl}/auth/callback?token=${accessToken}`);
  }
  @Get('profile')
  @UseGuards(JwtAuthGuard) // Protect this route with JWT authentication
  async getProfile(@Req() req: Request) {
    return req.user; // User data from JWT payload
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request) {
    const user: any = req.user;
    await this.usersService.clearRefreshToken(user._id);
    return { message: 'Logged out successfully' };
  }
}
