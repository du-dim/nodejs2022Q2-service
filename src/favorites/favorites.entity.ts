import { AlbumEntity } from 'src/albums/albums.entity';
import { ArtistEntity } from 'src/artists/artists.entity';
import { TrackEntity } from 'src/tracks/tracks.entity';
import { Entity, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';

@Entity('favorites')
export class FavoritesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => AlbumEntity, (album) => album, { cascade: true })
  @JoinTable({ name: 'favorites_album' })
  albums: AlbumEntity[];

  @ManyToMany(() => ArtistEntity, (artist) => artist, { cascade: true })
  @JoinTable({ name: 'favorites_artist' })
  artists: ArtistEntity[];

  @ManyToMany(() => TrackEntity, (traсk) => traсk, { cascade: true })
  @JoinTable({ name: 'favorites_track' })
  tracks: TrackEntity[];
}
