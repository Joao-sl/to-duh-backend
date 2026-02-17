import { AppModule } from './app/app.module';
import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { exposeUnsetFields: false },
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
    app.enableCors({ origin: process.env.ALLOWED_ORIGINS });
  }

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
