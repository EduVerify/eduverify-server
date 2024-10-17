import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { Posts } from './posts.entity';

@Entity('universities')
export class Universities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'varchar' })
  name: string;

  @Column({ nullable: true, type: 'varchar' })
  city: string;

  @Column({ nullable: true, type: 'varchar' })
  address: string;

  @Column({ nullable: true, type: 'varchar' })
  website: string;

  @Column({ nullable: true, type: 'varchar' })
  email: string;

  @Column({ nullable: true, type: 'varchar' })
  phone: string;

  @Column({ nullable: true, type: 'varchar' })
  description: string;

  @Column({ nullable: true, type: 'varchar' })
  logo: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Users, { onDelete: 'CASCADE', eager: true })
  @JoinColumn()
  user: Users;

  @OneToMany(() => Posts, (post) => post.university)
  posts: Posts[];
}
