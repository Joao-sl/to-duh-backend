import { registerAs } from '@nestjs/config';
import { jwtConfigSchema } from './schemas/jwt.schema';

export default registerAs('jwt', () => {
  const env = jwtConfigSchema.parse(process.env);

  return {
    secret: env.JWT_SECRET,
    accessTtl: env.JWT_ACCESS_TTL,
    refreshTtl: env.JWT_REFRESH_TTL,
    audience: env.JWT_TOKEN_AUDIENCE,
    issuer: env.JWT_TOKEN_ISSUER,
  };
});
