import { AlbumEntity } from 'src/albums/albums.entity';
import { TrackEntity } from 'src/tracks/tracks.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column({ type: 'boolean', default: false })
  grammy: boolean;

  @OneToMany(() => TrackEntity, (tr) => tr.artistId)
  tracks: TrackEntity[];

  @OneToMany(() => AlbumEntity, (alb) => alb.artistId)
  albums: AlbumEntity[];
}
