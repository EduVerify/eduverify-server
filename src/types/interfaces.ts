export interface IConfigService {
  DB_PORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  DB_HOST: string;
  APP_PORT: string;
  APP_HOSTNAME: string;
  JWT_SECRET: string;
  MAILER_HOST: string;
  MAILER_PORT: number;
  MAILER_USER: string;
  MAILER_PASS: string;
}
