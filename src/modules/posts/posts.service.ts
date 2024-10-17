import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/entities/posts.entity';
import { Repository } from 'typeorm';
import { UniversitiesService } from '../universities/universities.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
    private readonly universityService: UniversitiesService,
  ) {}
  async create(createPostDto: CreatePostDto, userId: number) {
    const university = await this.universityService.findByUser(userId);
    return await this.postsRepository.save(
      this.postsRepository.create({
        ...createPostDto,
        university,
      }),
    );
  }

  findAll() {
    return this.postsRepository.find();
  }

  findOne(id: number) {
    return this.postsRepository.findOne({ where: { id } });
  }

  findByUniversity(universityId: number) {
    return this.postsRepository.find({
      where: { university: { id: universityId } },
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postsRepository.update(id, updatePostDto);
  }

  remove(id: number) {
    return this.postsRepository.delete(id);
  }
}
