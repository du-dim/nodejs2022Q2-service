import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from 'src/albums/albums.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { ArtistsController } from './artists.controller';
import { ArtistEntity } from './artists.entity';
import { ArtistsService } from './artists.service';

@Module({
  imports: [
    forwardRef(() => FavoritesModule),
    TracksModule,
    AlbumsModule,
    TypeOrmModule.forFeature([ArtistEntity]),
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
