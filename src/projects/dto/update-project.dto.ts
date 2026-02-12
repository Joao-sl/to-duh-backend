import { Trim } from 'src/common/decorators/trim.decorator';
import {
  IsBoolean,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateProjectDto {
  @Trim()
  @IsString()
  @MinLength(1)
  @MaxLength(80)
  @Matches(/\S/, { message: 'Cannot contain only spaces' })
  @IsOptional()
  name?: string;

  @Trim()
  @IsString()
  @MaxLength(255)
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  is_favorite?: boolean;

  @IsBoolean()
  @IsOptional()
  is_archived?: boolean;
}
