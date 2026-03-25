import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { SectionsModule } from 'src/sections/sections.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { UsersModule } from 'src/users/users.module';
import { ProjectDetailsController } from './project-details.controller';
import { ProjectDetailsService } from './project-details.service';

@Module({
  imports: [
    ProjectsModule,
    SectionsModule,
    TasksModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [ProjectDetailsController],
  providers: [ProjectDetailsService],
})
export class ProjectDetailsModule {}
