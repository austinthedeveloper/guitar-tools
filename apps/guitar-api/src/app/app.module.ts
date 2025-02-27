import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './services/users.service';
import { AuthController, AmpController, PedalController } from './controllers';
import {
  AmpService,
  GoogleStrategy,
  JwtStrategy,
  PedalService,
} from './services';
import {
  Amp,
  AmpSchema,
  AmpUsage,
  AmpUsageSchema,
  Knob,
  KnobSchema,
  Pedal,
  PedalBoard,
  PedalBoardSchema,
  PedalSchema,
  PedalUsage,
  PedalUsageSchema,
  User,
  UserSchema,
} from './schemas';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(), // Loads .env file
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase'
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Amp.name, schema: AmpSchema }]),
    MongooseModule.forFeature([{ name: Knob.name, schema: KnobSchema }]),
    MongooseModule.forFeature([
      { name: AmpUsage.name, schema: AmpUsageSchema },
    ]),
    MongooseModule.forFeature([{ name: Amp.name, schema: AmpSchema }]),
    MongooseModule.forFeature([{ name: Pedal.name, schema: PedalSchema }]),
    MongooseModule.forFeature([
      { name: PedalBoard.name, schema: PedalBoardSchema },
    ]),
    MongooseModule.forFeature([
      { name: PedalUsage.name, schema: PedalUsageSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController, AuthController, AmpController, PedalController],
  providers: [
    AppService,
    UsersService,
    AmpService,
    PedalService,
    GoogleStrategy,
    JwtStrategy,
  ],
})
export class AppModule {}
