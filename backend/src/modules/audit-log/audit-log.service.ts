import { Injectable } from '@nestjs/common';
import { AuditLogRepository } from '@database/entities/audit_logs/repository';

@Injectable()
export class AuditLogService {
  constructor(private readonly auditLogRepo: AuditLogRepository) {}

  async log(action: string, details?: any, userId?: string, ip?: string, userAgent?: string) {
    return this.auditLogRepo.log(action, details, userId, ip, userAgent);
  }

  async getLogs() {
    return this.auditLogRepo.findAll();
  }
} 