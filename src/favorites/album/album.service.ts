import { Injectable } from '@nestjs/common';
import { inMemoryDB } from 'src/database';

@Injectable()
export class AlbumFavService {
  favorites = inMemoryDB.favorites;

  async add(id: string) {
    this.favorites.albums.push(id);
    return this.favorites.albums;
  }

  async del(id: string) {
    this.favorites.albums = this.favorites.albums.filter((a) => a !== id);
    return this.favorites.albums;
  }
}
