import { PriorityEnum } from '../entities/task.entity';
import { Trim } from 'src/common/decorators/trim.decorator';
import {
  IsEnum,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsNumber()
  @IsPositive()
  project_id: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  section_id?: number;

  @Trim()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(2000)
  description?: string;

  @IsOptional()
  @IsEnum(PriorityEnum)
  priority?: PriorityEnum;

  @IsOptional()
  @IsISO8601({ strict: true })
  due_at?: string;
}
