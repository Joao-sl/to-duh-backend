import { registerAs } from '@nestjs/config';
import { databaseSchema } from './schemas/database.schema';

export default registerAs('database', () => {
  const env = databaseSchema.parse(process.env);

  return {
    type: env.DATABASE_TYPE,
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    database: env.DATABASE_DATABASE,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    autoLoadEntities: env.DATABASE_AUTOLOADENTITIES,
    synchronize: env.DATABASE_SYNCHRONIZE,
  };
});
