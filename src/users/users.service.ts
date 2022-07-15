import {
  NotFoundException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from 'src/_typesTS/types';
import { v4 as uuidv4 } from 'uuid';
import { db } from 'src/database';

@Injectable()
export class UsersService {
  users = db.users;
  async getAll() {
    const copeUsers = JSON.parse(JSON.stringify(this.users)) as IUser[];
    copeUsers.forEach((u) => delete u.password);
    return copeUsers;
  }

  async getById(id: string) {
    const userId = this.users.find((u) => u.id === id);
    if (!userId) throw new NotFoundException("User doesn't exist");
    const copyUser = { ...userId };
    delete copyUser.password;
    return copyUser;
  }

  async create(user: CreateUserDto) {
    const id = { id: uuidv4() };
    const version = { version: 1 };
    const now = +Date.now();
    const createdAt = { createdAt: now };
    const updatedAt = { updatedAt: now };
    this.users.push({ ...id, ...user, ...version, ...createdAt, ...updatedAt });
    return await this.getById(id.id);
  }

  async update(user: UpdatePasswordDto, id: string) {
    const userId = this.users.find((u) => u.id === id);
    if (!userId) throw new NotFoundException("User doesn't exist");
    if (userId.password !== user.oldPassowrd)
      throw new ForbiddenException('OldPassowrd is wrong');
    userId.password = user.newPassword;
    userId.version += 1;
    userId.updatedAt = +Date.now();
    return await this.getById(id);
  }

  async remove(id: string) {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException("User doesn't exist");
    this.users = this.users.filter((u) => u.id !== id);
    return;
  }
}
