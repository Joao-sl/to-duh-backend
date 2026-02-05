import z from 'zod';

export const coreSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.coerce.number().positive().max(65536).default(3000),
});
