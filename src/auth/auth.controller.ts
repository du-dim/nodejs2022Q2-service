import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(204)
  async signup(@Body() userDto: CreateUserDto) {
    await this.authService.signup(userDto);
  }
  @Post('login')
  @HttpCode(200)
  async login(@Body() userDto: CreateUserDto) {
    return await this.authService.login(userDto);
  }
}
