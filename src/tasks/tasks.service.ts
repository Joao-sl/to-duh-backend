import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UsersService } from 'src/users/users.service';
import { ProjectsService } from 'src/projects/projects.service';
import { SectionsService } from 'src/sections/sections.service';
import { JwtAccessTokenPayloadDto } from 'src/auth/dto/jwt-token-payload.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly TasksRepo: Repository<Task>,
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService,
    private readonly sectionsService: SectionsService,
  ) {}

  async create(jwtPayload: JwtAccessTokenPayloadDto, data: CreateTaskDto) {
    const user = await this.usersService.findOneById(jwtPayload.sub);
    const project = await this.projectsService.findOneByIdAndUserId(
      data.project_id,
      user.id,
    );
    const section = data.section_id
      ? await this.sectionsService.findOneByIdAndUserId(
          data.section_id,
          user.id,
        )
      : undefined;

    const taskPayload = {
      user: user,
      project: project,
      section: section,
      title: data.title,
      description: data.description,
      due_at: data.due_at,
      priority: data.priority,
    };

    const task = await this.TasksRepo.save(taskPayload);
    return task;
  }
}
