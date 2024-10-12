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
  Put,
  Param,
} from '@nestjs/common';
import * as oauth from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { FRONT_URL } from 'src/config/constants';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { CreateUserDto } from '../users/dtos/create_user.dto';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { UpdatePasswordDto } from '../users/dtos/update_password.dto';
import { User } from 'src/decorators/user.decorator';
import { Users } from 'src/entities/users.entity';
import { authType } from 'src/types/enum';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

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

  @Post('forgot-password')
  @HttpCode(200)
  async forgotPassword(@Body() body) {
    return this.authService.forgotPassword(body.email);
  }

  @Put('reset-password/:id')
  @HttpCode(200)
  async resetPassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id') id: number,
  ) {
    return this.authService.resetPassword(updatePasswordDto, id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('switch-role')
  @HttpCode(200)
  async switchRole(@User() user: Users, @Body('role') role: authType) {
    return await this.authService.switchRole(user.id, role);
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
    const generateRandomUsername = (firstName: string, lastName: string) => {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      return `${firstName.toLowerCase()}_${lastName.toLowerCase()}_${randomSuffix}`;
    };
    const username = generateRandomUsername(first_name, last_name);
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
        email +
        '&username=' +
        username,
    );
  }
}
