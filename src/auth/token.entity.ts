import { UserEntity } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('refresh_token')
export class TokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  refresh: string;

  @OneToOne(() => UserEntity, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;
}
