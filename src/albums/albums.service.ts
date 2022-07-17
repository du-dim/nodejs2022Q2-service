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

@Injectable()
export class AlbumsService {
  albums = inMemoryDB.albums;
  tracks = inMemoryDB.tracks;
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
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
    this.albums.push({ ...id, ...album });
    return await this.getById(id.id);
  }

  async update(album: UpdateAlbumDto, id: string) {
    const albumIndex = this.albums.findIndex((alb) => alb.id === id);
    if (albumIndex < 0) throw new NotFoundException("Album doesn't exist");
    const newAlbum = { ...this.albums[albumIndex], ...album };
    this.albums[albumIndex] = newAlbum;
    return await this.getById(id);
  }

  async remove(id: string) {
    const albumIndex = this.albums.findIndex((alb) => alb.id === id);
    if (albumIndex < 0) throw new NotFoundException("Album doesn't exist");
    this.albums = this.albums.filter((alb) => alb.id !== id);
    this.tracks.forEach((tr, i) => {
      this.tracks[i].albumId = tr.albumId === id ? null : tr.albumId;
    });
    await this.favoritesService.del('albums', id);
    return;
  }
}
