import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { inMemoryDB } from 'src/database';

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
    return this.favorites;
  }

  async add(entity: string, id: string) {
    this.favorites[entity].push(id);
    const keyService = `${entity}Service` as
      | 'albumsService'
      | 'artistsService'
      | 'tracksService';
    console.log(await this[keyService].getById(id));
    return await this[keyService].getById(id);
  }

  async del(entity: string, id: string) {
    this.favorites[entity] = this.favorites[entity].filter(
      (e: string) => e !== id,
    );
    return;
  }
}
