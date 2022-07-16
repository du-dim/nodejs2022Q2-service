import { Module } from '@nestjs/common';
import { AlbumFavController } from './album.controller';
import { AlbumFavService } from './album.service';

@Module({ controllers: [AlbumFavController], providers: [AlbumFavService] })
export class TrackFavModule {}
