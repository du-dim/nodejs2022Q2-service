import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('traсk')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  name: string;

  @Column({ type: 'uuid', default: null })
  artistId: string | null;

  @Column({ type: 'uuid', default: null })
  albumId: string | null;

  @Column('int')
  duration: number;
}
