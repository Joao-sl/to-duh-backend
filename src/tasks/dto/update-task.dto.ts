import {
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Trim } from 'src/common/decorators/trim.decorator';
import { PriorityEnum } from '../entities/task.entity';

export class UpdateTaskDto {
  @Trim()
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(255)
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(2000)
  description?: string;

  @IsOptional()
  @IsEnum(PriorityEnum)
  priority?: PriorityEnum;

  @IsBoolean()
  @IsOptional()
  is_completed: boolean;

  @IsOptional()
  @IsISO8601({ strict: true })
  due_at?: string;
}
