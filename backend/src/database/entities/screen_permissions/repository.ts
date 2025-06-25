import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScreenPermission } from './entity';

@Injectable()
export class ScreenPermissionRepository {
  constructor(
    @InjectRepository(ScreenPermission)
    private readonly screenPermissionRepository: Repository<ScreenPermission>,
  ) {}

  async findAll(): Promise<ScreenPermission[]> {
    return this.screenPermissionRepository.find();
  }
} 