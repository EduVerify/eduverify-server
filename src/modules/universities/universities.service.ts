import { Injectable } from '@nestjs/common';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Universities } from 'src/entities/university.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/users.entity';

@Injectable()
export class UniversitiesService {
  constructor(
    @InjectRepository(Universities)
    private readonly universitiesRespository: Repository<Universities>,
  ) {}
  async create(createUniversityDto: CreateUniversityDto, user: Users) {
    return await this.universitiesRespository.save(
      this.universitiesRespository.create({ user, ...createUniversityDto }),
    );
  }

  async checkUniversity(userId: number) {
    return await this.universitiesRespository.exists({
      where: { user: { id: userId } },
    });
  }

  async findAll() {
    return await this.universitiesRespository.find({
      select: ['id', 'name', 'city', 'phone', 'logo', 'website', 'description'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} university`;
  }

  update(id: number, updateUniversityDto: UpdateUniversityDto) {
    return `This action updates a #${id} university`;
  }

  remove(id: number) {
    return `This action removes a #${id} university`;
  }
}
