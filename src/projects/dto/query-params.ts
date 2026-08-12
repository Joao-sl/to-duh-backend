import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class ProjectQueryDto {
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  archived?: boolean = false;
}
