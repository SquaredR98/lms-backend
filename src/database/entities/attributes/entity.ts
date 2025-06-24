import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('attributes')
export class Attribute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description?: string;
} 