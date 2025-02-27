import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // Loads .env file
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase'
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
