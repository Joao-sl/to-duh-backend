import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class SectionQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  project_id?: number;
}
