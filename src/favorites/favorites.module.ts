import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { FavoritesController } from './favorites.controller';
import { FavoritesEntity } from './favorites.entity';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [
    AlbumsModule,
    ArtistsModule,
    TracksModule,
    TypeOrmModule.forFeature([FavoritesEntity]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
