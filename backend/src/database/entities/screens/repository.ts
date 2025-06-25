import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Screen } from './entity';

@Injectable()
export class ScreenRepository {
  constructor(
    @InjectRepository(Screen)
    private readonly screenRepository: Repository<Screen>,
  ) {}

  async findAll(): Promise<Screen[]> {
    return this.screenRepository.find();
  }
} 