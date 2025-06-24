import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  timestamp: Date;

  @Column({ nullable: true })
  userId?: string;

  @Column()
  action: string;

  @Column('jsonb', { nullable: true })
  details?: any;

  @Column({ nullable: true })
  ip?: string;

  @Column({ nullable: true })
  userAgent?: string;
} 