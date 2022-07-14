import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validate, v4 as uuidv4 } from 'uuid';
import { db } from 'src/database';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  tracks = db.tracks;

  async getAll() {
    return this.tracks;
  }

  async getById(id: string) {
    if (!validate(id)) throw new BadRequestException('TrackId is invalid');
    const trackId = this.tracks.find((art) => art.id === id);
    if (!trackId) throw new NotFoundException("Track doesn't exist");
    return trackId;
  }

  async create(track: CreateTrackDto) {
    const id = { id: uuidv4() };
    this.tracks.push({ ...id, ...track });
    return await this.getById(id.id);
  }

  async update(user: UpdateTrackDto, id: string) {
    const userId = this.tracks.find((art) => art.id === id);
    if (!userId) throw new NotFoundException("Track doesn't exist");
    return await this.getById(id);
  }

  async remove(id: string) {
    if (!validate(id)) throw new BadRequestException('TrackId is invalid');
    const track = this.tracks.find((art) => art.id === id);
    if (!track) throw new NotFoundException("Track doesn't exist");
    this.tracks = this.tracks.filter((art) => art.id !== id);
    return;
  }
}
