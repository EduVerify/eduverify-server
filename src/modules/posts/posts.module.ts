import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from 'src/entities/posts.entity';
import { UniversitiesModule } from '../universities/universities.module';

@Module({
  imports: [TypeOrmModule.forFeature([Posts]), UniversitiesModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
