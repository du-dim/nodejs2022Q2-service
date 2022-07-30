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
import { IFavorites } from 'src/_typesTS/types';

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
    const favorites = (
      await this.favoritesRepository.find({
        relations: ['artists', 'albums', 'tracks'],
      })
    )[0];
    if (!favorites)
      return { artists: [], albums: [], tracks: [] } as IFavorites;

    const albums = favorites.albums;
    const artists = favorites.artists;
    const tracks = favorites.tracks;
    return { albums, artists, tracks };
  }

  async add(entity: string, id: string) {
    try {
      await this.initial();
      const favorites = (
        await this.favoritesRepository.find({ relations: [entity] })
      )[0];
      console.log(favorites);
      console.log(favorites.artists);
      const keyService = `${entity}Service` as
        | 'albumsService'
        | 'artistsService'
        | 'tracksService';
      const dbEntity = await this[keyService].getById(id);
      favorites[entity] = [...favorites[entity], dbEntity];
      await this.favoritesRepository.save(favorites);
      delete favorites.id;
      return favorites;
    } catch (error) {
      throw new UnprocessableEntityException(`${error}`);
    }
  }

  async del(entity: string, id: string) {
    const favorites = (
      await this.favoritesRepository.find({ relations: [entity] })
    )[0];
    favorites[entity] = favorites[entity].filter((e: string) => e !== id);
    await this.favoritesRepository.save(favorites);
  }

  async initial() {
    const favoritesArr = await this.favoritesRepository.find();
    if (favoritesArr.length) return;
    const table = this.favoritesRepository.create();
    await this.favoritesRepository.save(table);
  }
}
