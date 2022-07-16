import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { EEntity } from 'src/_typesTS/types';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  @Get()
  @HttpCode(200)
  getAll() {
    return this.favoritesService.getAll();
  }

  @Post(':entity/:id')
  @HttpCode(201)
  add(
    @Param('entity', new ParseEnumPipe(EEntity)) entity: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.add(`${entity}s`, id);
  }

  @Delete(':entity/:id')
  @HttpCode(204)
  del(
    @Param('entity', new ParseEnumPipe(EEntity)) entity: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.del(`${entity}s`, id);
  }
}
