import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { inMemoryDB } from 'src/database';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  artists = inMemoryDB.artists;
  tracks = inMemoryDB.tracks;

  async getAll() {
    return this.artists;
  }

  async getById(id: string) {
    const artistId = this.artists.find((art) => art.id === id);
    if (!artistId) throw new NotFoundException("Artist doesn't exist");
    return artistId;
  }

  async create(artist: CreateArtistDto) {
    const id = { id: uuidv4() };
    this.artists.push({ ...id, ...artist });
    return await this.getById(id.id);
  }

  async update(artist: UpdateArtistDto, id: string) {
    const artistIndex = this.artists.findIndex((art) => art.id === id);
    if (artistIndex < 0) throw new NotFoundException("Artist doesn't exist");
    const newArtist = { ...this.artists[artistIndex], ...artist };
    this.artists[artistIndex] = newArtist;
    return await this.getById(id);
  }

  async remove(id: string) {
    const artistIndex = this.artists.findIndex((art) => art.id === id);
    if (artistIndex < 0) throw new NotFoundException("Artist doesn't exist");
    this.artists = this.artists.filter((art) => art.id !== id);
    this.tracks.forEach((tr, i) => {
      this.tracks[i].artistId = tr.artistId === id ? null : tr.artistId;
    });
    return;
  }
}
