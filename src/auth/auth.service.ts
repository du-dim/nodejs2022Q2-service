import {
  ConflictException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { TokenEntity } from './token.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';
import { UserEntity } from 'src/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    @InjectRepository(TokenEntity)
    private tokenRepository: Repository<TokenEntity>,
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
    const tokens = this.generateTokens(user);
    await this.updateRefresh(user, tokens.refresh_token);
    return tokens;
  }

  async refresh(refresh_token) {
    return;
  }

  generateTokens(user: UserEntity) {
    const payload = { id: user.id, login: user.login };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async updateRefresh(user: UserEntity, refresh: string) {
    const hashRefresh = await bcrypt.hash(refresh, +process.env.CRYPT_SALT);
    const up = await this.tokenRepository.update(user.id, {
      refresh: hashRefresh,
    });
  }

  async createRefresh(user: UserEntity) {
    const refresh = this.generateTokens(user).refresh_token;
    const hashRefresh = await bcrypt.hash(refresh, +process.env.CRYPT_SALT);
    const token = this.tokenRepository.create({ refresh: hashRefresh });
    token.user = user;
    await this.tokenRepository.save(token);
  }
}
