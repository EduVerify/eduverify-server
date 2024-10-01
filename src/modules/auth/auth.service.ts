import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwt-payload.interface';
import { CreateUserDto } from '../users/dtos/create_user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
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
    const payload: JwtPayload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: CreateUserDto) {
    const userExist = await this.usersService.findOne(userDto.email);
    if (userExist) {
      throw new BadRequestException('Cette adresse email est déjà utilisée.');
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const user = await this.usersService.create({
      ...userDto,
      password: hashedPassword,
    });
    const payload: JwtPayload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async conectionWithSocialNet(userDto: any) {
    const user = await this.usersService.createSocialAccount(userDto);
    const payload: JwtPayload = { email: user.email, id: user.id };
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
    const payload = { email: user.email, id: user.id };
    return this.jwtService.sign(payload);
  }
}
