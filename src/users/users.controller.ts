import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @HttpCode(200)
  getAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  @HttpCode(200)
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.getById(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  @HttpCode(200)
  update(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    console.log(id, updatePasswordDto);
    return this.usersService.update(updatePasswordDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.remove(id);
  }
}
