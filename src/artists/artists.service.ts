import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validate, v4 as uuidv4 } from 'uuid';
import { db } from 'src/database';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  artists = db.artists;

  async getAll() {
    return this.artists;
  }

  async getById(id: string) {
    if (!validate(id)) throw new BadRequestException('ArtistId is invalid');
    const artistId = this.artists.find((art) => art.id === id);
    if (!artistId) throw new NotFoundException("Artist doesn't exist");
    return artistId;
  }

  async create(artist: CreateArtistDto) {
    const id = { id: uuidv4() };
    this.artists.push({ ...id, ...artist });
    return await this.getById(id.id);
  }

  async update(user: UpdateArtistDto, id: string) {
    const userId = this.artists.find((art) => art.id === id);
    if (!userId) throw new NotFoundException("Artist doesn't exist");
    return await this.getById(id);
  }

  async remove(id: string) {
    if (!validate(id)) throw new BadRequestException('ArtistId is invalid');
    const artist = this.artists.find((art) => art.id === id);
    if (!artist) throw new NotFoundException("Artist doesn't exist");
    this.artists = this.artists.filter((art) => art.id !== id);
    return;
  }
}
