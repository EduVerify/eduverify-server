import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as path from 'path';
import * as fs from 'fs';
import * as ejs from 'ejs';
@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  private async sendMail(
    to: string,
    subject: string,
    filename: string,
    data: any,
  ) {
    try {
      const templatePath = path.resolve(
        __dirname,
        '..',
        '..',
        'templates',
        `${filename}.ejs`,
      );

      const templateContent = await fs.promises.readFile(templatePath, 'utf-8');
      const renderedTemplate = ejs.render(templateContent, data);

      this.mailerService.sendMail({
        to,
        subject,
        html: renderedTemplate,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  sendConfirmationEmail(to: string, url: string) {
    return this.sendMail(to, 'Confirmation Email', 'sendEmail', { url });
  }
}
