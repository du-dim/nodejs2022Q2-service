import {
  Injectable,
  Inject,
  forwardRef,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { inMemoryDB } from 'src/database';
import { IFavoritesRepsonse } from 'src/_typesTS/types';
import e from 'express';

@Injectable()
export class FavoritesService {
  favorites = inMemoryDB.favorites;

  constructor(
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
    @Inject(forwardRef(() => ArtistsService))
    private artistsService: ArtistsService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
  ) {}

  async getAll() {
    const p1 = this.favorites.albums.map((id) =>
      this.albumsService.getById(id),
    );
    const p2 = this.favorites.artists.map((id) =>
      this.artistsService.getById(id),
    );
    const p3 = this.favorites.tracks.map((id) =>
      this.tracksService.getById(id),
    );
    const result = await Promise.all([p1, p2, p3]);
    const albums = { albums: await Promise.all(result[0]) };
    const artists = { artists: await Promise.all(result[1]) };
    const tracks = { tracks: await Promise.all(result[2]) };
    return { ...albums, ...artists, ...tracks };
  }

  async add(entity: string, id: string) {
    const keyService = `${entity}Service` as
      | 'albumsService'
      | 'artistsService'
      | 'tracksService';
    const obj = await this[keyService].getById(id);
    if (!obj)
      throw new UnprocessableEntityException(
        `${entity.slice(0, -1)} doesn't exist`,
      );
    this.favorites[entity].push(id);
    return await this[keyService].getById(id);
  }

  async del(entity: string, id: string) {
    this.favorites[entity] = this.favorites[entity].filter(
      (e: string) => e !== id,
    );
    return;
  }
}
