import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import databaseConfig from './config/database.config';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from 'src/projects/projects.module';
import { SectionsModule } from 'src/sections/sections.module';
import { TasksModule } from 'src/tasks/tasks.module';
import coreConfig from './config/core.config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import throttlerConfig from './config/throttler.config';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ProjectsModule,
    SectionsModule,
    TasksModule,
    ConfigModule.forRoot({ load: [coreConfig] }),
    ConfigModule.forFeature(databaseConfig),
    TypeOrmModule.forRootAsync(databaseConfig.asProvider()),
    ThrottlerModule.forRootAsync(throttlerConfig.asProvider()),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
