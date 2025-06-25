import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './entity';

@Injectable()
export class AuditLogRepository {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogRepository: Repository<AuditLog>,
  ) {}

  async log(action: string, details?: any, userId?: string, ip?: string, userAgent?: string) {
    const log = this.auditLogRepository.create({
      action,
      details,
      userId,
      ip,
      userAgent,
    });
    return this.auditLogRepository.save(log);
  }

  async findAll(): Promise<AuditLog[]> {
    return this.auditLogRepository.find({ order: { timestamp: 'DESC' } });
  }
} 