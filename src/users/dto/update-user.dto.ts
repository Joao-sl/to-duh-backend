import {
  IsString,
  IsOptional,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MaxLength(128)
  password?: string;

  @IsString()
  @IsOptional()
  @MaxLength(128)
  @IsStrongPassword(
    {},
    {
      message:
        'Password must have: 8 characters min, 1 lowercase, 1 uppercase, 1 symbol and 1 number',
    },
  )
  newPassword?: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  name?: string;
}
