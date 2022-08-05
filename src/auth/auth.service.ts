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
import { UserEntity } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { TokenEntity } from './token.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';
import { TokenDto } from './dto/token.dto';
import { JwtPayload } from 'jsonwebtoken';

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
    await this.updateRefresh(user, tokens.refreshToken);
    return tokens;
  }

  async refresh(userId: string, refresh: TokenDto) {
    if (!refresh.refreshToken) {
      throw new UnauthorizedException('No {refreshToken} in the body');
    }
    try {
      const user = await this.usersService.getById(userId);
      const tokenDB = await this.tokenRepository.findOne({
        relations: ['user'],
        where: { user: { id: user.id } },
      });

      const payload = this.jwtService.decode(
        refresh.refreshToken,
      ) as JwtPayload;

      const isMatchRefresh = refresh.refreshToken === tokenDB.refresh;
      const isTime = payload.exp < +Date.now() / 1000;
      console.log(isMatchRefresh, isTime);

      if (!isMatchRefresh || isTime) {
        throw new Error('refreshToken is invalid or expired');
      }
      const tokens = this.generateTokens(user);
      await this.updateRefresh(user, tokens.refreshToken);
      return tokens;
    } catch (error) {
      throw new ForbiddenException(`${error}`);
    }
  }

  generateTokens(user: { id: string; login: string }) {
    const payload = { sub: user.id, login: user.login };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async updateRefresh(user: { id: string; login: string }, refresh: string) {
    const token = await this.tokenRepository.findOne({
      relations: ['user'],
      where: { user: { id: user.id } },
    });
    token.refresh = refresh;
    await this.tokenRepository.save(token);
  }

  async createRefresh(user: UserEntity) {
    const refresh = this.generateTokens(user).refreshToken;
    const token = this.tokenRepository.create({ refresh });
    token.user = user;
    await this.tokenRepository.save(token);
  }

  async validateUser(payload: { sub: string; login: string }) {
    const user = await this.usersService.getByLogin(payload.login);
    if (user && user.id === payload.sub) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
