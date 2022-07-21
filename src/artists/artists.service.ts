import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TracksService } from 'src/tracks/tracks.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './artists.entity';
import { Repository } from 'typeorm';
import { AlbumsService } from 'src/albums/albums.service';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,

    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,

    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,

    @InjectRepository(ArtistEntity)
    private artistsRepository: Repository<ArtistEntity>,
  ) {}

  async getAll() {
    return await this.artistsRepository.find();
  }

  async getById(id: string) {
    const artistId = await this.artistsRepository.findOneBy({ id: id });
    if (!artistId) throw new NotFoundException("Artist doesn't exist");
    return artistId;
  }

  async create(artist: CreateArtistDto) {
    const grammy = { grammy: false };
    const createArtist = this.artistsRepository.create({
      ...grammy,
      ...artist,
    });
    return await this.artistsRepository.save(createArtist);
  }

  async update(artist: UpdateArtistDto, id: string) {
    const artistId = await this.artistsRepository.findOneBy({ id: id });
    if (!artist) throw new NotFoundException("Artist doesn't exist");
    const updateArtist = { ...artistId, ...artist };
    return await this.artistsRepository.save(updateArtist);
  }

  async remove(id: string) {
    const result = await this.artistsRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException("Artist doesn't exist");
    this.albumsService.idNullArtist(id);
    this.tracksService.idNull('artistId', id);
    this.favoritesService.del('artists', id);
  }
}
