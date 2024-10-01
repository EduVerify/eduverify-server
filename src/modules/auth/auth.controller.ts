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

@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  // @UseGuards(LocalAuthGuard)
  // @HttpCode(200)
  // @Post('login')
  // async login(@Req() req) {
  //   return this.authService.login(req.user);
  // }

  // @Post('register')
  // @HttpCode(200)
  // async register(@Body() createUserDto: CreateUserDto) {
  //   return this.authService.register(createUserDto);
  // }

  // @Post('send_verification_email')
  // @HttpCode(200)
  // async sendVerificationEmail(@Body('email') email: string) {
  //   return await this.authService.sendEmail(email);
  // }

  // @Get('facebook')
  // @UseGuards(oauth.AuthGuard('facebook'))
  // async facebookLogin(): Promise<any> {
  //   return HttpStatus.OK;
  // }

  // @Get('/facebook/redirect')
  // @UseGuards(oauth.AuthGuard('facebook'))
  // async facebookLoginRedirect(
  //   @Req() req: Request,
  //   @Res() res: Response,
  // ): Promise<any> {
  //   const { access_token } = await this.authService.conectionWithSocialNet(
  //     req.user,
  //   );
  //   res.redirect(FRONT_URL + '?token=' + access_token);
  // }

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
    const token = this.authService.generateJwt(req.user);
    res.redirect(FRONT_URL + 'VerifyToken?token=' + token);
  }
}
