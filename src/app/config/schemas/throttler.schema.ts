import z from 'zod';

export const throttlerSchema = z.object({
  THROTTLER_TTL: z.coerce.number().positive().default(60000),
  THROTTLER_LIMIT: z.coerce.number().positive().default(30),
  THROTTLER_BLOCK_DURATION: z.coerce.number().positive().default(27000),
});
