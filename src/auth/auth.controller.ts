import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Public } from './guard/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('signup')
  @HttpCode(204)
  async signup(@Body() userDto: CreateUserDto) {
    await this.authService.signup(userDto);
  }
  @Public()
  @Post('login')
  @HttpCode(200)
  async login(@Body() userDto: CreateUserDto) {
    return await this.authService.login(userDto);
  }
  @Post('refresh')
  @HttpCode(200)
  async refresh(@Req() req) {
    return await this.authService.refresh(req.user.sub, req.body);
  }
}
