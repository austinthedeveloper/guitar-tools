import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UsersService } from '../services/users.service';
import { ConfigService } from '@nestjs/config';
import { AuthUser } from '../models';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3000/api/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    const user = await this.usersService.findOrCreate(profile);

    // Ensure the returned user matches the AuthUser type
    const authUser: AuthUser = {
      _id: user._id.toString(),
      googleId: user.googleId,
      email: user.email,
      displayName: user.displayName,
      photoUrl: user.photoUrl,
    };

    done(null, authUser);
  }
}
