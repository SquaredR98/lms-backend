import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Context } from './entity';

@Injectable()
export class ContextRepository {
  constructor(
    @InjectRepository(Context)
    private readonly contextRepository: Repository<Context>,
  ) {}

  async findAll(): Promise<Context[]> {
    return this.contextRepository.find();
  }
} 