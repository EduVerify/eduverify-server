import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { IConfigService } from 'src/types/interfaces';

export async function registerGlobal(
  app: NestExpressApplication,
  callback: (url: string) => void,
) {
  const configService = app.get(ConfigService<IConfigService>);
  const PORT = parseInt(configService.get<string>('APP_PORT'));
  const HOSTNAME = configService.get<string>('APP_HOSTNAME');
  app.enableCors({ origin: '*' });
  app.setGlobalPrefix('api');
  app.useStaticAssets(join(__dirname, '..', '..', 'uploads'), {
    prefix: '/uploads', // Add a prefix if needed
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, HOSTNAME, async () =>
    callback((await app.getUrl()) + '/api'),
  );
}
