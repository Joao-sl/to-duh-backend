import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class TaskQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  project_id?: number;
}
