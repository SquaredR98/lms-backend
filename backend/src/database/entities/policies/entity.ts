import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Attribute } from '@database/entities/attributes/entity';
import { Permission } from '@database/entities/permissions/entity';
import { Context } from '@database/entities/contexts/entity';

@Entity('policies')
export class Policy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => Attribute, { eager: true, nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'attribute_id' })
  attribute?: Attribute;

  @ManyToOne(() => Permission, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'permission_id' })
  permission: Permission;

  @ManyToOne(() => Context, { eager: true, nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'context_id' })
  context?: Context;

  @Column('text')
  rule: string; // JSON or expression
} 