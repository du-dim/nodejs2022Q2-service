import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validate, v4 as uuidv4 } from 'uuid';
import { db } from 'src/database';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  albums = db.albums;

  async getAll() {
    return this.albums;
  }

  async getById(id: string) {
    if (!validate(id)) throw new BadRequestException('AlbumId is invalid');
    const albumId = this.albums.find((art) => art.id === id);
    if (!albumId) throw new NotFoundException("Album doesn't exist");
    return albumId;
  }

  async create(album: CreateAlbumDto) {
    const id = { id: uuidv4() };
    this.albums.push({ ...id, ...album });
    return await this.getById(id.id);
  }

  async update(user: UpdateAlbumDto, id: string) {
    const userId = this.albums.find((art) => art.id === id);
    if (!userId) throw new NotFoundException("Album doesn't exist");
    return await this.getById(id);
  }

  async remove(id: string) {
    if (!validate(id)) throw new BadRequestException('AlbumId is invalid');
    const album = this.albums.find((art) => art.id === id);
    if (!album) throw new NotFoundException("Album doesn't exist");
    this.albums = this.albums.filter((art) => art.id !== id);
    return;
  }
}
