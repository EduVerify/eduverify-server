import { INestApplication } from '@nestjs/common';

export function registerGlobal(
  app: INestApplication,
  callback: (url: string) => void,
) {}
