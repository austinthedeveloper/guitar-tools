import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './services/users.service';
import { AuthController } from './controllers';
import { GoogleStrategy, JwtStrategy } from './services';
import { User, UserSchema } from './schemas';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(), // Loads .env file
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase'
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, UsersService, GoogleStrategy, JwtStrategy],
})
export class AppModule {}
