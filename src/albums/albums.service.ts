import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { inMemoryDB } from 'src/database';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class AlbumsService {
  albums = inMemoryDB.albums;
  tracks = inMemoryDB.tracks;
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,

    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
  ) {}

  async getAll() {
    return this.albums;
  }

  async getById(id: string) {
    const albumId = this.albums.find((alb) => alb.id === id);
    if (!albumId) throw new NotFoundException("Album doesn't exist");
    return albumId;
  }

  async create(album: CreateAlbumDto) {
    const id = { id: uuidv4() };
    const year = { year: 0 };
    this.albums.push({ ...id, ...year, ...album });
    return this.getById(id.id);
  }

  async update(album: UpdateAlbumDto, id: string) {
    const albumIndex = this.albums.findIndex((alb) => alb.id === id);
    if (albumIndex < 0) throw new NotFoundException("Album doesn't exist");
    const newAlbum = { ...this.albums[albumIndex], ...album };
    this.albums[albumIndex] = newAlbum;
    return this.getById(id);
  }

  async remove(id: string) {
    const albumIndex = this.albums.findIndex((alb) => alb.id === id);
    if (albumIndex < 0) throw new NotFoundException("Album doesn't exist");
    this.albums = this.albums.filter((alb) => alb.id !== id);
    this.tracksService.idNull('albumId');
    this.favoritesService.del('albums', id);
  }
}
