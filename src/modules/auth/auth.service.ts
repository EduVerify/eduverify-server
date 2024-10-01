import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    // private usersService: UsersService,
    private jwtService: JwtService,
    // private mailService: MailService,
  ) {}

  // async validateUser(email: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne(email);
  //   if (user) {
  //     const hashPass = await bcrypt.compare(pass, user.password);
  //     if (hashPass) {
  //       const { password, ...result } = user;
  //       return result;
  //     }
  //   }
  //   return null;
  // }

  // async login(user: any) {
  //   const payload: JwtPayload = { email: user.email, id: user.id };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

  // async register(userDto: CreateUserDto) {
  //   const { email } = await this.jwtService.verifyAsync(userDto.token);
  //   const userExist = await this.usersService.findOne(email);
  //   if (userExist) {
  //     throw new BadRequestException('Cette adresse email est déjà utilisée.');
  //   }
  //   const hashedPassword = await bcrypt.hash(userDto.password, 10);
  //   const user = await this.usersService.create({
  //     ...userDto,
  //     email,
  //     password: hashedPassword,
  //   });
  //   const payload: JwtPayload = { email: user.email, id: user.id };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

  // async sendEmail(email: string) {
  //   const user = await this.usersService.findOne(email);
  //   if (user) {
  //     return { message: 'Le courrier a été envoyé avec succès !' };
  //   }
  //   const payload = { email };
  //   const token = this.jwtService.sign(payload);
  //   await this.mailService.send_confirmation_mail(email, token);
  //   return { message: 'Le courrier a été envoyé avec succès !' };
  // }

  // async conectionWithSocialNet(userDto: any) {
  //   const user = await this.usersService.createSocialAccount(userDto);
  //   const payload: JwtPayload = { email: user.email, id: user.id };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

  generateJwt(user: any) {
    const payload = { email: user.email, id: user.id };
    return this.jwtService.sign(payload);
  }
}
