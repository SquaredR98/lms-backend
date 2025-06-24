import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAttribute } from './entity';

@Injectable()
export class UserAttributeRepository {
  constructor(
    @InjectRepository(UserAttribute)
    private readonly userAttributeRepository: Repository<UserAttribute>,
  ) {}

  async findAll(): Promise<UserAttribute[]> {
    return this.userAttributeRepository.find();
  }
} 