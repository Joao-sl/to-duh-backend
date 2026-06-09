import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Trim } from 'src/common/decorators/trim.decorator';

export class UpdateSectionDto {
  @Trim()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @IsOptional()
  name: string;

  @IsBoolean()
  @IsOptional()
  is_archived?: boolean;
}
