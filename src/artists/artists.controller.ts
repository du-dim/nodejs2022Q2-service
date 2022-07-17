import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}
  @Get()
  @HttpCode(200)
  async getAll() {
    return await this.artistsService.getAll();
  }

  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.artistsService.getById(id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistsService.create(createArtistDto);
  }

  @Put(':id')
  @HttpCode(200)
  async update(
    @Body() updateArtistDto: UpdateArtistDto,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.artistsService.update(updateArtistDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.artistsService.remove(id);
  }
}
