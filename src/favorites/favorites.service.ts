import {
  Injectable,
  Inject,
  forwardRef,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesEntity } from './favorites.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
    @Inject(forwardRef(() => ArtistsService))
    private artistsService: ArtistsService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
    @InjectRepository(FavoritesEntity)
    private favoritesRepository: Repository<FavoritesEntity>,
  ) {}

  async getAll() {
    const p1 = (await this.favoritesRepository.find())[0].albums.map(
      async (id) => await this.albumsService.getById(id),
    );
    const p2 = (await this.favoritesRepository.find())[0].artists.map(
      async (id) => await this.artistsService.getById(id),
    );
    const p3 = (await this.favoritesRepository.find())[0].tracks.map(
      async (id) => await this.tracksService.getById(id),
    );
    const result = await Promise.all([p1, p2, p3]);
    const albums = { albums: await Promise.all(result[0]) };
    const artists = { artists: await Promise.all(result[1]) };
    const tracks = { tracks: await Promise.all(result[2]) };
    return { ...albums, ...artists, ...tracks };
  }

  async add(entity: string, id: string) {
    const keyService = `${entity}Service` as
      | 'albumsService'
      | 'artistsService'
      | 'tracksService';
    const favorites = (await this.favoritesRepository.find())[0];
    const dbEntity = await this[keyService].getAll();

    if (dbEntity.findIndex((e: { id: string }) => e.id === id) < 0)
      throw new UnprocessableEntityException(
        `${entity.slice(0, -1)} doesn't exist`,
      );

    favorites[entity].push(id);
    await this.favoritesRepository.save(favorites);
    return await this[keyService].getById(id);
  }

  async del(entity: string, id: string) {
    const favorites = (await this.favoritesRepository.find())[0];
    favorites[entity] = favorites[entity].filter((e: string) => e !== id);
    await this.favoritesRepository.save(favorites);
  }
}
