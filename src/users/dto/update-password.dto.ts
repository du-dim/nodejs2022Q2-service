import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  oldPassowrd: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
