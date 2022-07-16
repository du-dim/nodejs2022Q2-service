import { Controller, Get, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  @Get()
  @HttpCode(200)
  getAll() {
    return this.favoritesService.getAll();
  }
}
