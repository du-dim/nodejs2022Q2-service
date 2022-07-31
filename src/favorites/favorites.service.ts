import { Injectable, UnprocessableEntityException } from '@nestjs/common';
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
    private albumsService: AlbumsService,
    private artistsService: ArtistsService,
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
    console.log(favorites);
    if (!favorites)
      return { artists: [], albums: [], tracks: [] } as IFavorites;

    delete favorites.id;
    return favorites;
  }

  async add(entity: string, id: string) {
    try {
      await this.initial();
      const favorites = (
        await this.favoritesRepository.find({
          relations: ['artists', 'albums', 'tracks'],
        })
      )[0];

      const keyService = `${entity}Service` as
        | 'albumsService'
        | 'artistsService'
        | 'tracksService';
      const dbEntity = await this[keyService].getById(id);
      favorites[entity].push(dbEntity);
      const result = await this.favoritesRepository.save(favorites);
      delete result.id;
      return result;
    } catch (error) {
      throw new UnprocessableEntityException(`${error}`);
    }
  }

  async del(entity: string, id: string) {
    const favorites = (
      await this.favoritesRepository.find({
        relations: ['artists', 'albums', 'tracks'],
      })
    )[0];
    favorites[entity] = favorites[entity].filter(
      (e: { id: string }) => e.id !== id,
    );
    await this.favoritesRepository.save(favorites);
  }

  async initial() {
    const favoritesArr = await this.favoritesRepository.find();
    if (favoritesArr.length) return;
    const table = this.favoritesRepository.create();
    await this.favoritesRepository.save(table);
  }
}
