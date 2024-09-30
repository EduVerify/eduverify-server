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
  // app.enableCors({
  //   origin: [FRONT_URL, LOCAL_BACKEND_API, FRONT_URL_RENDER, BACKEND_API],
  //   credentials: true,
  // });
  app.setGlobalPrefix('api');
  // app.useGlobalInterceptors(new ResponseInterceptor());
  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, HOSTNAME, async () =>
    callback((await app.getUrl()) + '/api'),
  );
}
