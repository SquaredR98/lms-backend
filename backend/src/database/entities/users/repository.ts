import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { User } from './entity';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
}

export class UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  isActive?: boolean;
}

export interface UserFilters {
  search?: string;
  role?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findById(id: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findAll(filters: UserFilters = {}): Promise<{ users: User[]; total: number }> {
    const { search, role, isActive, page = 1, limit = 10 } = filters;
    
    const queryBuilder: SelectQueryBuilder<User> = this.userRepository
      .createQueryBuilder('user');

    // Apply filters
    if (search) {
      queryBuilder.andWhere(
        '(user.firstName ILIKE :search OR user.lastName ILIKE :search OR user.email ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    if (role) {
      queryBuilder.andWhere('user.role = :role', { role });
    }

    if (isActive !== undefined) {
      queryBuilder.andWhere('user.isActive = :isActive', { isActive });
    }

    // Get total count
    const total = await queryBuilder.getCount();

    // Apply pagination
    const offset = (page - 1) * limit;
    queryBuilder
      .orderBy('user.createdAt', 'DESC')
      .skip(offset)
      .take(limit);

    const users = await queryBuilder.getMany();

    return { users, total };
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    await this.userRepository.update(id, updateUserDto);
    return await this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected > 0;
  }

  async softDelete(id: string): Promise<boolean> {
    const result = await this.userRepository.update(id, { isActive: false });
    return result.affected > 0;
  }

  async activate(id: string): Promise<boolean> {
    const result = await this.userRepository.update(id, { isActive: true });
    return result.affected > 0;
  }

  async findByRole(role: string): Promise<User[]> {
    return await this.userRepository.find({ where: { role, isActive: true } });
  }

  async countByRole(role: string): Promise<number> {
    return await this.userRepository.count({ where: { role, isActive: true } });
  }

  async getActiveUsersCount(): Promise<number> {
    return await this.userRepository.count({ where: { isActive: true } });
  }

  async getInactiveUsersCount(): Promise<number> {
    return await this.userRepository.count({ where: { isActive: false } });
  }
} 