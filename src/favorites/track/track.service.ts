import { Injectable } from '@nestjs/common';
import { inMemoryDB } from 'src/database';

@Injectable()
export class TrackFavService {
  favorites = inMemoryDB.favorites;

  async add(id: string) {
    this.favorites.tracks.push(id);
    return this.favorites.tracks;
  }

  async del(id: string) {
    this.favorites.tracks = this.favorites.tracks.filter((t) => t !== id);
    return this.favorites.tracks;
  }
}
