import { Injectable } from '@nestjs/common';
import { JwtAccessTokenPayloadDto } from 'src/auth/dto/jwt-token-payload.dto';
import { ProjectsService } from 'src/projects/projects.service';
import { SectionsService } from 'src/sections/sections.service';
import { TasksService } from 'src/tasks/tasks.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProjectDetailsService {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly sectionsService: SectionsService,
    private readonly tasksService: TasksService,
    private readonly usersService: UsersService,
  ) {}
  async getBoard(jwtPayload: JwtAccessTokenPayloadDto, projectId: number) {
    const user = await this.usersService.findOneById(jwtPayload.sub);
    const [project, sections, tasksWithoutSection] = await Promise.all([
      this.projectsService.findOneByIdAndUserId(projectId, user.id),
      this.sectionsService.findAllByOwner(
        user.id,
        { project_id: projectId, archived: false },
        ['tasks'],
      ),
      this.tasksService.findAllByOwner(
        user.id,
        {
          project_id: projectId,
          section_id: null,
        },
        { id: 'ASC' },
      ),
    ]);

    return {
      ...project,
      sections: [...sections],
      tasks_without_sections: [...tasksWithoutSection],
    };
  }
}
