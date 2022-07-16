import { Injectable } from '@nestjs/common';
import { inMemoryDB } from 'src/database';

@Injectable()
export class ArtistFavService {
  favorites = inMemoryDB.favorites;

  async add(id: string) {
    this.favorites.artists.push(id);
    return this.favorites.artists;
  }
  async del(id: string) {
    this.favorites.artists = this.favorites.artists.filter((a) => a !== id);
    return this.favorites.tracks;
  }
}
