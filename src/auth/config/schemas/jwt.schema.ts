import z from 'zod';

export const jwtConfigSchema = z.object({
  JWT_SECRET: z.string({
    error: 'JWT_SECRET must be a string, preferably 32 characters',
  }),
  JWT_TOKEN_AUDIENCE: z.url({
    error: 'JWT_TOKEN_AUDIENCE must be an URL',
  }),
  JWT_TOKEN_ISSUER: z.url({
    error: 'JWT_TOKEN_ISSUER must be an URL',
  }),
  JWT_ACCESS_TTL: z.coerce.number({
    error: 'JWT_ACCESS_TTL must be a number',
  }),
  JWT_REFRESH_TTL: z.coerce.number({
    error: 'JWT_REFRESH_TTL must be a number',
  }),
});
