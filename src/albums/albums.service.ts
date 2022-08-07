import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './albums.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
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
    createAlbum.artistId = album.artistId;
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
  }
}
