import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@Entity('users')
@Index(['email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  @IsNotEmpty()
  firstName: string;

  @Column({ name: 'last_name' })
  @IsNotEmpty()
  lastName: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @MinLength(6)
  password: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
} 