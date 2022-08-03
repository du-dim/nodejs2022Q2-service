import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { TokenDto } from './dto/token.dto';

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
  @Post('refresh')
  @HttpCode(200)
  async refresh(@Body() tokenDto: TokenDto) {
    return await this.authService.refresh(tokenDto);
  }
}
