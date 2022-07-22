import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favorites')
export class FavoritesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { array: true })
  artists: string[];

  @Column('uuid', { array: true })
  albums: string[];

  @Column('uuid', { array: true })
  tracks: string[];
}
