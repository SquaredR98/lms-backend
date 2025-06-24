import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLogService } from './audit-log.service';
import { AuditLogRepository } from '@database/entities/audit_logs/repository';
import { AuditLog } from '@database/entities/audit_logs/entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuditLog])],
  providers: [AuditLogService, AuditLogRepository],
  exports: [AuditLogService],
})
export class AuditLogModule {} 