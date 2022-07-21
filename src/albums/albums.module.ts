import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsController } from './albums.controller';
import { AlbumEntity } from './albums.entity';
import { AlbumsService } from './albums.service';

@Module({
  imports: [
    forwardRef(() => FavoritesModule),
    TracksModule,
    TypeOrmModule.forFeature([AlbumEntity]),
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
