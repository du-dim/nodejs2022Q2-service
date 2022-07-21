import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('trak')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  name: string;

  @Column()
  artistId: string | null;

  @Column()
  albumId: string | null;

  @Column('int')
  duration: number;
}
