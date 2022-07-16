import {
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { TrackFavService } from './track.service';

@Controller('track')
export class TrackFavController {
  constructor(private readonly tackFavService: TrackFavService) {}
  @Post(':id')
  @HttpCode(201)
  add(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.tackFavService.add(id);
  }

  @Delete(':id')
  @HttpCode(204)
  del(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.tackFavService.del(id);
  }
}
