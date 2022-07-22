import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  login: string;

  @Column()
  password: string;

  @Column('int')
  version: number;

  @Column('int')
  createdAt: number;

  @Column('int')
  updatedAt: number;

  toResponse() {
    const { id, login, version, createdAt, updatedAt } = this;
    return { id, login, version, createdAt, updatedAt };
  }
}
