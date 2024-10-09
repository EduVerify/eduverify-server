import { Module } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { UniversitiesController } from './universities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Universities } from 'src/entities/university.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Universities])],
  controllers: [UniversitiesController],
  providers: [UniversitiesService],
  exports: [UniversitiesService],
})
export class UniversitiesModule {}
