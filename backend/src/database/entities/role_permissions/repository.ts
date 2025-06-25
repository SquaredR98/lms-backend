import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolePermission } from './entity';

@Injectable()
export class RolePermissionRepository {
  constructor(
    @InjectRepository(RolePermission)
    private readonly rolePermissionRepository: Repository<RolePermission>,
  ) {}

  async findAll(): Promise<RolePermission[]> {
    return this.rolePermissionRepository.find();
  }
} 