import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from './entity';

@Injectable()
export class UserRoleRepository {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {}

  async findAll(): Promise<UserRole[]> {
    return this.userRoleRepository.find();
  }
} 