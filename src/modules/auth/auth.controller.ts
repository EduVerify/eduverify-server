import {
  Controller,
  UseGuards,
  Post,
  Body,
  HttpCode,
  Get,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';
import * as oauth from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { FRONT_URL } from 'src/config/constants';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { CreateUserDto } from '../users/dtos/create_user.dto';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @HttpCode(200)
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Get('google')
  @UseGuards(oauth.AuthGuard('google'))
  async googleLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/google/redirect')
  @UseGuards(oauth.AuthGuard('google'))
  async googleLoginRedirect(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const { access_token, first_name, last_name, picture, role, email } =
      await this.authService.conectionWithSocialNet(req.user);
    res.redirect(
      FRONT_URL +
        '?oauth=google&token=' +
        access_token +
        '&first_name=' +
        first_name +
        '&last_name=' +
        last_name +
        '&picture=' +
        picture +
        '&role=' +
        role +
        '&email=' +
        email,
    );
  }
}
