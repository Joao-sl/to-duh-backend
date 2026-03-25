import { Section } from 'src/sections/entities/section.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @RelationId((project: Project) => project.user)
  user_id: number;

  @OneToMany(() => Section, section => section.project)
  sections: Section[];

  @Column({ length: 80 })
  name: string;

  @Column({ length: 255, nullable: true })
  description: string;

  @Column({ default: false })
  is_favorite: boolean;

  @Column({ default: false })
  is_archived: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
