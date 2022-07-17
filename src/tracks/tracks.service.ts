import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { inMemoryDB } from 'src/database';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class TracksService {
  tracks = inMemoryDB.tracks;
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  async getAll() {
    return this.tracks;
  }

  async getById(id: string) {
    const trackId = this.tracks.find((tr) => tr.id === id);
    if (!trackId) throw new NotFoundException("Track doesn't exist");
    return trackId;
  }

  async create(track: CreateTrackDto) {
    const id = { id: uuidv4() };
    this.tracks.push({ ...id, ...track });
    return await this.getById(id.id);
  }

  async update(track: UpdateTrackDto, id: string) {
    const trackIndex = this.tracks.findIndex((tr) => tr.id === id);
    if (trackIndex < 0) throw new NotFoundException("Artist doesn't exist");
    const newTrack = { ...this.tracks[trackIndex], ...track };
    this.tracks[trackIndex] = newTrack;
    return await this.getById(id);
  }

  async remove(id: string) {
    const track = this.tracks.find((tr) => tr.id === id);
    if (!track) throw new NotFoundException("Track doesn't exist");
    this.tracks = this.tracks.filter((tr) => tr.id !== id);
    await this.favoritesService.del('tracks', id);
    return;
  }
}
