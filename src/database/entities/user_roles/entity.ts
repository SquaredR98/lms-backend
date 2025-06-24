import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from '@database/entities/roles/entity';
import { User } from '@database/entities/users/entity';
import { Context } from '@database/entities/contexts/entity';

@Entity('user_roles')
export class UserRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Role, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => Context, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'context_id' })
  context: Context;
} 