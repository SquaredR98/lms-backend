import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Screen } from '@database/entities/screens/entity';
import { Permission } from '@database/entities/permissions/entity';

@Entity('screen_permissions')
export class ScreenPermission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Screen, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'screen_id' })
  screen: Screen;

  @ManyToOne(() => Permission, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'permission_id' })
  permission: Permission;
} 