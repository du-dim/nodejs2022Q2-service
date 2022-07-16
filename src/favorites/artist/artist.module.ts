import { Module } from '@nestjs/common';
import { ArtistFavController } from './artist.controller';
import { ArtistFavService } from './artist.service';

@Module({ controllers: [ArtistFavController], providers: [ArtistFavService] })
export class TrackFavModule {}
