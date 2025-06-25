import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { User } from '@database/entities/users/entity';
import { Attribute } from '@database/entities/attributes/entity';

@Entity('user_attributes')
export class UserAttribute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Attribute, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'attribute_id' })
  attribute: Attribute;

  @Column()
  value: string;
} 