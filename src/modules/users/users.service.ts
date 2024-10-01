import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create_user.dto';
import { CreateUserNetworkDto } from './dtos/create_user_network.dto';

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
        'role',
      ],
    });
  }

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.save(
      this.usersRepository.create(createUserDto),
    );
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
      return await this.usersRepository.save(
        this.usersRepository.create(createUserDto),
      );
    }
  }
}
