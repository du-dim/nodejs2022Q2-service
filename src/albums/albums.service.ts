import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TracksService } from 'src/tracks/tracks.service';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './albums.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,

    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,

    @InjectRepository(AlbumEntity)
    private albumsRepository: Repository<AlbumEntity>,
  ) {}

  async getAll() {
    return await this.albumsRepository.find();
  }

  async getById(id: string) {
    const albumId = await this.albumsRepository.findOneBy({ id });
    if (!albumId) throw new NotFoundException("Album doesn't exist");
    return albumId;
  }

  async create(album: CreateAlbumDto) {
    const createAlbum = this.albumsRepository.create(album);
    return await this.albumsRepository.save(createAlbum);
  }

  async update(album: UpdateAlbumDto, id: string) {
    const albumId = await this.albumsRepository.findOneBy({ id });
    if (!albumId) throw new NotFoundException("Album doesn't exist");
    const updateAlbum = { ...albumId, ...album };
    return await this.albumsRepository.save(updateAlbum);
  }

  async remove(id: string) {
    const result = await this.albumsRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException("Album doesn't exist");
    await this.tracksService.idNull('albumId', id);
    await this.favoritesService.del('albums', id);
  }

  async idNullArtist(id: string) {
    for await (const alb of await this.getAll()) {
      alb.artistId = alb.artistId === id ? null : alb.artistId;
      await this.albumsRepository.save(alb);
    }
  }
}
