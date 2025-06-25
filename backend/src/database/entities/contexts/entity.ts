import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('contexts')
export class Context {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string; // e.g., system, course, module

  @Column({ nullable: true })
  instanceId?: string; // e.g., course_id, module_id

  @ManyToOne(() => Context, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parent_context_id' })
  parentContext?: Context;
} 