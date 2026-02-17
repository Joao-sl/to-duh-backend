import { registerAs } from '@nestjs/config';
import { throttlerSchema } from './schemas/throttler.schema';

export default registerAs('throttler', () => {
  const env = throttlerSchema.parse(process.env);

  return [
    {
      ttl: env.THROTTLER_TTL,
      limit: env.THROTTLER_LIMIT,
      blockDuration: env.THROTTLER_BLOCK_DURATION,
    },
  ];
});
