import {
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { AlbumFavService } from './album.service';

@Controller('album')
export class AlbumFavController {
  constructor(private readonly favoritesService: AlbumFavService) {}
  @Post(':id')
  @HttpCode(201)
  add(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.add(id);
  }

  @Delete(':id')
  @HttpCode(204)
  del(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.del(id);
  }
}
