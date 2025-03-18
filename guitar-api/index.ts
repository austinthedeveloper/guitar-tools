import { HttpRequest, Context } from '@azure/functions';
import { AzureHttpAdapter } from '@nestjs/azure-func-http';
import { createApp } from '../apps/guitar-api/src/main.azure';

export default function (context: Context, req: HttpRequest): void {
  AzureHttpAdapter.handle(createApp, context, req);
}
