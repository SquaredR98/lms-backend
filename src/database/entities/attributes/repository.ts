import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attribute } from './entity';

@Injectable()
export class AttributeRepository {
  constructor(
    @InjectRepository(Attribute)
    private readonly attributeRepository: Repository<Attribute>,
  ) {}

  async findAll(): Promise<Attribute[]> {
    return this.attributeRepository.find();
  }
} 