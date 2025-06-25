import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from '@modules/users/users.service';
import { CreateUserDto, UpdateUserDto, UserFilters } from '@database/entities/users/repository';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Get()
  async getUsers(@Query() filters: UserFilters) {
    return await this.usersService.getUsers(filters);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.usersService.getUserById(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }

  @Put(':id/activate')
  @HttpCode(HttpStatus.OK)
  async activateUser(@Param('id') id: string) {
    return await this.usersService.activateUser(id);
  }

  @Put(':id/deactivate')
  @HttpCode(HttpStatus.OK)
  async deactivateUser(@Param('id') id: string) {
    return await this.usersService.deactivateUser(id);
  }

  @Get('stats/active-count')
  async getActiveUsersCount() {
    return await this.usersService.getActiveUsersCount();
  }

  @Get('stats/inactive-count')
  async getInactiveUsersCount() {
    return await this.usersService.getInactiveUsersCount();
  }
} 