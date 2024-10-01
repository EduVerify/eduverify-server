import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfigService } from 'src/types/interfaces';

export async function registerGlobal(
  app: INestApplication,
  callback: (url: string) => void,
) {
  const configService = app.get(ConfigService<IConfigService>);
  const PORT = parseInt(configService.get<string>('APP_PORT'));
  const HOSTNAME = configService.get<string>('APP_HOSTNAME');
  app.enableCors({ origin: '*' });
  app.setGlobalPrefix('api');
  // app.useGlobalInterceptors(new ResponseInterceptor());
  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, HOSTNAME, async () =>
    callback((await app.getUrl()) + '/api'),
  );
}
