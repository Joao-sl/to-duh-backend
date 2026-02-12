import { Module } from '@nestjs/common';
import { SectionsController } from './sections.controller';
import { SectionsService } from './sections.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from './entities/section.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ProjectsModule,
    TypeOrmModule.forFeature([Section]),
  ],
  controllers: [SectionsController],
  providers: [SectionsService],
})
export class SectionsModule {}
