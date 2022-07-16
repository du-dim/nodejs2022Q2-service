import { Injectable } from '@nestjs/common';
import { inMemoryDB } from 'src/database';

@Injectable()
export class FavoritesService {
  favorites = inMemoryDB.favorites;

  async getAll() {
    return this.favorites;
  }
}
