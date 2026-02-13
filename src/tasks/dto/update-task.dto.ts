import {
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsOptional,
  IsString,
  Matches,
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
  @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, {
    message: 'Date must be in format YYYY-MM-DDTHH:mm:ss.SSSZ',
  })
  completed_at: Date;

  @IsOptional()
  @IsISO8601({ strict: true })
  @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, {
    message: 'Date must be in format YYYY-MM-DDTHH:mm:ss.SSSZ',
  })
  due_at?: Date;
}
