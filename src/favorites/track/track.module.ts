import { Module } from '@nestjs/common';
import { TrackFavController } from './track.controller';
import { TrackFavService } from './track.service';

@Module({ controllers: [TrackFavController], providers: [TrackFavService] })
export class TrackFavModule {}
