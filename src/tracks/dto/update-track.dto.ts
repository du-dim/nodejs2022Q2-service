import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  artistId: string | null;

  albumId: string | null;

  duration: number;
}
