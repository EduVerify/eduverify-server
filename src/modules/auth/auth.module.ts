import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { JWT_SECRET_KEY } from 'src/config/constants';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { MailerModule } from 'src/libs/mailer.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    MailerModule.register(),
    JwtModule.register({
      global: true,
      secret: JWT_SECRET_KEY,
      signOptions: {
        expiresIn: '30d',
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, GoogleStrategy, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
