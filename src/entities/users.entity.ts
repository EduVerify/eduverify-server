import { authType } from 'src/types/enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  first_name: string;

  @Column('varchar')
  last_name: string;

  @Column('varchar')
  email: string;

  @Column('varchar', { select: false, nullable: true })
  password: string;

  @Column('varchar', { nullable: true })
  phone: string;

  @Column('varchar', { nullable: true })
  social_id: string;

  @Column({ enum: authType, default: authType.STUDENT })
  role: authType;

  @Column('varchar', { nullable: true })
  picture: string;
}
