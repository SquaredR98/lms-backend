import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Policy } from './entity';

@Injectable()
export class PolicyRepository {
  constructor(
    @InjectRepository(Policy)
    private readonly policyRepository: Repository<Policy>,
  ) {}

  async findAll(): Promise<Policy[]> {
    return this.policyRepository.find();
  }
} 