import { registerAs } from '@nestjs/config';
import { coreSchema } from './schemas/core.schema';

export default registerAs('core', () => {
  const env = coreSchema.parse(process.env);

  return {
    node_env: env.NODE_ENV,
    port: env.PORT,
    allowed_origins: env.ALLOWED_ORIGINS,
  };
});
