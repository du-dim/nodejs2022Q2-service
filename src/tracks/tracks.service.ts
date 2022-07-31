import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from './tracks.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private tracksRepository: Repository<TrackEntity>,
  ) {}

  async getAll() {
    return await this.tracksRepository.find();
  }

  async getById(id: string) {
    const tracksId = await this.tracksRepository.findOneBy({ id });
    if (!tracksId) throw new NotFoundException("Track doesn't exist");
    return tracksId;
  }

  async create(artist: CreateTrackDto) {
    const createTrack = this.tracksRepository.create(artist);
    return await this.tracksRepository.save(createTrack);
  }

  async update(track: UpdateTrackDto, id: string) {
    const trackId = await this.tracksRepository.findOneBy({ id });
    if (!trackId) throw new NotFoundException("Track doesn't exist");
    const updateTrack = { ...trackId, ...track };
    return await this.tracksRepository.save(updateTrack);
  }

  async remove(id: string) {
    const result = await this.tracksRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException("Track doesn't exist");
  }
}
