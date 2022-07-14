import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}
  @Get()
  @HttpCode(200)
  getAll() {
    return this.tracksService.getAll();
  }

  @Get(':id')
  @HttpCode(200)
  getById(@Param('id') id: string) {
    return this.tracksService.getById(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Put(':id')
  @HttpCode(200)
  update(@Body() updateTrackDto: UpdateTrackDto, @Param('id') id: string) {
    return this.tracksService.update(updateTrackDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.tracksService.remove(id);
  }
}
