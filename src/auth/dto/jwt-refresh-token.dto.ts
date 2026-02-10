import { IsNotEmpty, IsString } from 'class-validator';

export class JwtRefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
