import { AlbumEntity } from 'src/albums/albums.entity';
import { ArtistEntity } from 'src/artists/artists.entity';
import { TrackEntity } from 'src/tracks/tracks.entity';
import { Entity, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';

@Entity('favorites')
export class FavoritesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => AlbumEntity)
  @JoinTable({ name: 'favorites_album' })
  albums: AlbumEntity[];

  @ManyToMany(() => ArtistEntity)
  @JoinTable({ name: 'favorites_artist' })
  artists: ArtistEntity[];

  @ManyToMany(() => TrackEntity)
  @JoinTable({ name: 'favorites_track' })
  tracks: TrackEntity[];
}
