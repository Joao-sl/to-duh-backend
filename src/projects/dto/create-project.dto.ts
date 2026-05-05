import { Trim } from 'src/common/decorators/trim.decorator';
import {
  IsBoolean,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProjectDto {
  @Trim()
  @IsString()
  @MinLength(1)
  @MaxLength(80)
  @Matches(/\S/, { message: 'name cannot contain only spaces' })
  name: string;

  @Trim()
  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;

  @Transform(({ value }) => {
    if (value === null || value === undefined) {
      return false;
    }

    return value === 'true' || value === true;
  })
  @IsBoolean()
  @IsOptional()
  is_favorite?: boolean;
}
