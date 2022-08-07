import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './artists.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistsRepository: Repository<ArtistEntity>,
  ) {}

  async getAll() {
    return await this.artistsRepository.find();
  }

  async getById(id: string) {
    const artistId = await this.artistsRepository.findOneBy({ id });
    if (!artistId) throw new NotFoundException("Artist doesn't exist");
    return artistId;
  }

  async create(artist: CreateArtistDto) {
    const createArtist = this.artistsRepository.create(artist);
    return await this.artistsRepository.save(createArtist);
  }

  async update(artist: UpdateArtistDto, id: string) {
    const artistId = await this.artistsRepository.findOneBy({ id });
    if (!artistId) throw new NotFoundException("Artist doesn't exist");
    const updateArtist = { ...artistId, ...artist };
    return await this.artistsRepository.save(updateArtist);
  }

  async remove(id: string) {
    const result = await this.artistsRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException("Artist doesn't exist");
  }
}
