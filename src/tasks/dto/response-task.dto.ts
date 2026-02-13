import { Exclude, Expose } from 'class-transformer';
import { PriorityEnum } from '../entities/task.entity';

@Exclude()
export class ResponseTaskDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description?: string;

  @Expose()
  priority?: PriorityEnum;

  @Expose()
  user_id: number;

  @Expose()
  project_id: number;

  @Expose()
  section_id?: number;

  @Expose()
  due_at?: Date;

  @Expose()
  is_completed: boolean;

  @Expose()
  completed_at: Date;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
