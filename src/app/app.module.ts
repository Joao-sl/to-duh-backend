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

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ProjectsModule,
    SectionsModule,
    TasksModule,
    ConfigModule.forRoot({}),
    ConfigModule.forFeature(databaseConfig),
    TypeOrmModule.forRootAsync(databaseConfig.asProvider()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
