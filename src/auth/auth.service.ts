import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(userDto: CreateUserDto) {
    const user = await this.usersService.getByLogin(userDto.login);
    if (user) throw new ConflictException('Login already exists');
    const hashPassword = await bcrypt.hash(
      userDto.password,
      +process.env.CRYPT_SALT,
    );
    await this.usersService.create({
      login: userDto.login,
      password: hashPassword,
    });
  }

  async login(userDto: CreateUserDto) {
    const user = await this.usersService.getByLogin(userDto.login);
    if (!user) throw new ForbiddenException('No user with such login');
    const isMatch = await bcrypt.compare(userDto.password, user.password);
    if (!isMatch) throw new ForbiddenException('Incorrect password');
    return {
      access_token: this.jwtService.sign({ id: user.id, login: user.login }),
    };
  }

  async refresh() {
    return;
  }
}
