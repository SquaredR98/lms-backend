import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entity';

@Injectable()
export class PermissionRepository {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async findByName(name: string): Promise<Permission | null> {
    return this.permissionRepository.findOne({ where: { name } });
  }

  async findAll(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }
} 