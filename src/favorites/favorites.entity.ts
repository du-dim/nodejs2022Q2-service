import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favorites')
export class FavoritesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('array')
  artists: string[];

  @Column('array')
  albums: string[];

  @Column('array')
  tracks: string[];
}
