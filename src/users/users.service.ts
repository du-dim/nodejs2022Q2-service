import {
  NotFoundException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getAll() {
    const users = await this.usersRepository.find();
    return users.map((u) => u.toResponse());
  }

  async getById(id: string) {
    const userId = await this.usersRepository.findOneBy({ id });
    if (!userId) throw new NotFoundException("User doesn't exist");
    return userId.toResponse();
  }

  async getByLogin(login: string) {
    return await this.usersRepository.findOne({ where: { login } });
  }

  async create(user: CreateUserDto) {
    const version = { version: 1 };
    const now = +Date.now();
    const createdAt = { createdAt: now };
    const updatedAt = { updatedAt: now };
    const createUser = this.usersRepository.create({
      ...user,
      ...version,
      ...createdAt,
      ...updatedAt,
    });
    return (await this.usersRepository.save(createUser)).toResponse();
  }

  async update(user: UpdatePasswordDto, id: string) {
    const userId = await this.usersRepository.findOneBy({ id });
    if (!userId) throw new NotFoundException("User doesn't exist");

    if (user.oldPassword !== userId.password)
      throw new ForbiddenException('OldPassowrd is wrong');
    const addition = {
      password: user.newPassword,
      version: userId.version + 1,
      updatedAt: +Date.now(),
    };
    await this.usersRepository.update({ id }, addition);
    return await this.getById(id);
  }

  async remove(id: string) {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException("User doesn't exist");
  }
}
