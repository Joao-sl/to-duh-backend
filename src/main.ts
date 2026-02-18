import helmet from 'helmet';
import { AppModule } from './app/app.module';
import { ValidationError } from 'class-validator';
import { NestFactory, Reflector } from '@nestjs/core';
import { formatPipeErrors } from './common/helpers/format-pipe-errors.helper';
import {
  BadRequestException,
  ClassSerializerInterceptor,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { exposeUnsetFields: false },
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const formattedErrors = formatPipeErrors(validationErrors);

        return new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid data',
          errors: formattedErrors,
        });
      },
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
