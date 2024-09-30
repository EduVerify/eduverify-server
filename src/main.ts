import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { registerGlobal } from './utils/register_global';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    snapshot: true,
    rawBody: true,
  });

  await registerGlobal(app, async (url) => {
    Logger.log(`Application is running on: ${url}`, 'NestApplication');
  });
})();
