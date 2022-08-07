import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TracksController } from './tracks.controller';
import { TrackEntity } from './tracks.entity';
import { TracksService } from './tracks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity])],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}
