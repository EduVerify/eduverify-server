import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create_user.dto';
import { CreateUserNetworkDto } from './dtos/create_user_network.dto';
import { UpdateUserDto } from './dtos/update_user.dto';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from './dtos/update_password.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async findOne(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
      select: { password: true, email: true, id: true },
    });
  }

  async findOneById(id: number) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  getMe(userId: number) {
    return this.usersRepository.findOne({
      where: { id: userId },
      select: [
        'id',
        'email',
        'first_name',
        'last_name',
        'phone',
        'picture',
        'username',
        'role',
      ],
    });
  }

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.save(
      this.usersRepository.create(createUserDto),
    );
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
    return await this.usersRepository.findOne({ where: { id } });
  }

  async createSocialAccount(createUserDto: CreateUserNetworkDto) {
    const user = await this.usersRepository.findOne({
      where: {
        social_id: createUserDto.social_id,
      },
    });
    if (user) {
      return user;
    } else {
      const generateRandomUsername = (firstName: string, lastName: string) => {
        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        return `${firstName.toLowerCase()}_${lastName.toLowerCase()}_${randomSuffix}`;
      };

      createUserDto.username = generateRandomUsername(
        createUserDto.first_name,
        createUserDto.last_name,
      );
      return await this.usersRepository.save(
        this.usersRepository.create(createUserDto),
      );
    }
  }

  async delete(id: number) {
    return await this.usersRepository.delete(id);
  }

  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: ['password'],
    });
    if (!updatePasswordDto.isOauth) {
      const isPasswordValid = await bcrypt.compare(
        updatePasswordDto.old_password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new BadRequestException('Invalid password');
      }
    }
    const hashedPassword = await bcrypt.hash(
      updatePasswordDto.new_password,
      10,
    );
    await this.usersRepository.update(id, { password: hashedPassword });
  }
}
