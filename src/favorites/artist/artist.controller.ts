import {
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ArtistFavService } from './artist.service';

@Controller('artist')
export class ArtistFavController {
  constructor(private readonly artistFavService: ArtistFavService) {}
  @Post(':id')
  @HttpCode(201)
  add(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistFavService.add(id);
  }

  @Delete(':id')
  @HttpCode(204)
  del(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistFavService.del(id);
  }
}
