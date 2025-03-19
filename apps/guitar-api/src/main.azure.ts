import { Context, HttpRequest } from '@azure/functions';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

let cachedHandler: (context: Context, req: HttpRequest) => Promise<void>;

async function createApp(): Promise<
  (context: Context, req: HttpRequest) => Promise<void>
> {
  const expressApp = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp)
  );

  app.setGlobalPrefix('api'); // API prefix
  await app.init();

  return async (context: Context, req: HttpRequest) => {
    const rawRes = {
      status: (statusCode: number) => ({
        json: (body: unknown) => {
          context.res = { status: statusCode, body };
          context.done();
        },
        send: (body: unknown) => {
          context.res = { status: statusCode, body };
          context.done();
        },
      }),
    };

    expressApp(req as any, rawRes as any);
  };
}

// Azure Function Entry Point
export default async function (context: Context, req: HttpRequest) {
  if (!cachedHandler) {
    cachedHandler = await createApp();
  }
  return cachedHandler(context, req);
}
