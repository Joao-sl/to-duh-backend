import { Project } from 'src/projects/entities/project.entity';
import { Section } from 'src/sections/entities/section.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

export enum PriorityEnum {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @RelationId((task: Task) => task.user)
  user_id: number;

  @ManyToOne(() => Project, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @RelationId((task: Task) => task.project)
  project_id: number;

  @ManyToOne(() => Section, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'section_id' })
  section: Section;

  @RelationId((task: Task) => task.section)
  section_id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 2000, nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: PriorityEnum,
    enumName: 'priority_enum',
    nullable: true,
  })
  priority: PriorityEnum;

  @Column({ default: false })
  is_completed: boolean;

  @Column({ nullable: true })
  completed_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  due_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
