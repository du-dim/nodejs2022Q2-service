import { Module, forwardRef } from '@nestjs/common';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TracksModule } from 'src/tracks/tracks.module';

import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';

@Module({
  imports: [forwardRef(() => FavoritesModule), TracksModule],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
