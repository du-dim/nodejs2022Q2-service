import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  year: number;

  artistId: string | null;
}
