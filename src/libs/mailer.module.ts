import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Module } from '@nestjs/common';
import { MailService } from './mailer.service';

@Module({
  imports: [HttpModule.register({})],
})
export class MailerModule {
  static register(): DynamicModule {
    return {
      module: MailerModule,
      providers: [MailService],
      imports: [HttpModule],
      exports: [MailService],
    };
  }
}
