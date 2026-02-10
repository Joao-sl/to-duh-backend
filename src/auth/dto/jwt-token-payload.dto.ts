export class JwtRefreshTokenPayloadDto {
  sub: number;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}

export class JwtAccessTokenPayloadDto {
  sub: number;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}
