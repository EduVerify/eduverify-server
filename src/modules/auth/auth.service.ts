import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwt-payload.interface';
import { CreateUserDto } from '../users/dtos/create_user.dto';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/libs/mailer.service';
import { FRONT_URL } from 'src/config/constants';
import { UpdatePasswordDto } from '../users/dtos/update_password.dto';
import { authType } from 'src/types/enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user) {
      const hashPass = await bcrypt.compare(pass, user.password);
      if (hashPass) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload: JwtPayload = {
      email: user.email,
      id: user.id,
      role: user.role,
    };
    const userData = await this.usersService.getMe(user.id);
    return {
      access_token: this.jwtService.sign(payload),
      user: userData,
    };
  }

  async register(userDto: CreateUserDto) {
    const userExist = await this.usersService.findOne(userDto.email);
    if (userExist) {
      throw new BadRequestException('Cette adresse email est déjà utilisée.');
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const username = `${userDto.first_name.toLowerCase()}.${userDto.last_name.toLowerCase()}${randomSuffix}`;
    userDto.username = username;
    const user = await this.usersService.create({
      ...userDto,
      password: hashedPassword,
    });
    if (userDto.role === authType.SCHOOL) {
      await this.usersService.createUniversity(userDto.university, user);
    }
    const payload: JwtPayload = {
      email: user.email,
      id: user.id,
      role: user.role,
    };
    const data = {
      access_token: this.jwtService.sign(payload),
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      phone: user.phone,
      email: user.email,
    };
    const url =
      FRONT_URL +
      '?oauth=email&token=' +
      data.access_token +
      '&first_name=' +
      data.first_name +
      '&last_name=' +
      data.last_name +
      '&role=' +
      data.role +
      '&email=' +
      data.email +
      '&username=' +
      username +
      '&phone=' +
      data.phone;
    await this.mailService.sendConfirmationEmail(user.email, url);
    return { message: 'Confirmation email sent !' };
  }
  async conectionWithSocialNet(userDto: any) {
    const user = await this.usersService.createSocialAccount(userDto);
    const payload: JwtPayload = {
      email: user.email,
      id: user.id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      first_name: user.first_name,
      last_name: user.last_name,
      picture: user.picture,
      role: user.role,
      email: user.email,
    };
  }

  generateJwt(user: any) {
    const payload: JwtPayload = {
      email: user.email,
      id: user.id,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }

  async forgotPassword(email: string) {
    // send email with token
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new BadRequestException('Email not found');
    }
    const token = this.generateJwt(user);
    const url = `${FRONT_URL}?auth_status=reset-password&token=${token}`;
    await this.mailService.sendConfirmationEmail(user.email, url);
  }

  async resetPassword(updatePasswordDto: UpdatePasswordDto, id: number) {
    await this.usersService.updatePassword(id, updatePasswordDto);
  }
}
