import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Universities } from './university.entity';

@Entity('posts')
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  desctiption: string;

  @Column()
  url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Universities, (university) => university.posts, {
    onDelete: 'CASCADE',
    eager: true,
  })
  university: Universities;
}
