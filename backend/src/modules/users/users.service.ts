import { Injectable } from '@nestjs/common';
import { UserRepository, CreateUserDto, UpdateUserDto, UserFilters } from '@database/entities/users/repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  async getUsers(filters: UserFilters) {
    return this.userRepository.findAll(filters);
  }

  async getUserById(id: string) {
    return this.userRepository.findById(id);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async deleteUser(id: string) {
    const success = await this.userRepository.delete(id);
    return { success };
  }

  async activateUser(id: string) {
    const success = await this.userRepository.activate(id);
    return { success };
  }

  async deactivateUser(id: string) {
    const success = await this.userRepository.softDelete(id);
    return { success };
  }

  async getActiveUsersCount() {
    return this.userRepository.getActiveUsersCount();
  }

  async getInactiveUsersCount() {
    return this.userRepository.getInactiveUsersCount();
  }
} 