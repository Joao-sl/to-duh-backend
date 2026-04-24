import {
  FindOptionsOrder,
  FindOptionsWhere,
  IsNull,
  Repository,
} from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UsersService } from 'src/users/users.service';
import { ProjectsService } from 'src/projects/projects.service';
import { SectionsService } from 'src/sections/sections.service';
import { JwtAccessTokenPayloadDto } from 'src/auth/dto/jwt-token-payload.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TaskQueryDto } from './dto/query-params.dto';
import { Section } from 'src/sections/entities/section.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepo: Repository<Task>,
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService,
    private readonly sectionsService: SectionsService,
  ) {}

  private handleCompletedAtUpdate(
    dbValue: boolean,
    newValue: boolean | undefined,
  ) {
    if (dbValue === newValue || newValue === undefined) {
      return undefined;
    }
    if (newValue === true) {
      return new Date().toISOString();
    }
    return null;
  }

  async findOneByOwner(id: number, userId: number) {
    const task = await this.tasksRepo.findOne({
      where: {
        id: id,
        user: { id: userId },
      },
    });

    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async findAllByOwner(
    userId: number,
    queryParams?: TaskQueryDto,
    orderParam?: FindOptionsOrder<Task>,
  ) {
    const where: FindOptionsWhere<Task> = {
      user: { id: userId },
    };

    if (queryParams?.project_id) {
      where.project = { id: queryParams.project_id };
    }

    if (queryParams?.section_id || queryParams?.section_id === null) {
      where.section =
        queryParams?.section_id === null
          ? IsNull()
          : { id: queryParams?.section_id };
    }

    const tasks = await this.tasksRepo.find({
      where,
      order: orderParam,
    });

    return tasks;
  }

  async getOne(jwtPayload: JwtAccessTokenPayloadDto, id: number) {
    const user = await this.usersService.findOneById(jwtPayload.sub);
    const task = await this.findOneByOwner(id, user.id);
    return task;
  }

  async getList(
    jwtPayload: JwtAccessTokenPayloadDto,
    queryParams: TaskQueryDto,
  ) {
    const user = await this.usersService.findOneById(jwtPayload.sub);
    const tasks = await this.findAllByOwner(user.id, queryParams);
    return tasks;
  }

  async create(jwtPayload: JwtAccessTokenPayloadDto, data: CreateTaskDto) {
    const user = await this.usersService.findOneById(jwtPayload.sub);
    let section: Section | undefined = undefined;

    if (data.section_id) {
      section = await this.sectionsService.findOneByIdAndUserId(
        data.section_id,
        user.id,
      );
    }

    if (section && section.project_id != data.project_id) {
      throw new BadRequestException(
        'Section does not belong to the specified project',
      );
    }

    const project = await this.projectsService.findOneByIdAndUserId(
      data.project_id,
      user.id,
    );

    const taskPayload = {
      user: user,
      project: project,
      section: section,
      title: data.title,
      description: data.description,
      due_at: data.due_at,
      priority: data.priority,
    };

    const task = await this.tasksRepo.save(taskPayload);
    return task;
  }

  async update(
    jwtPayload: JwtAccessTokenPayloadDto,
    data: UpdateTaskDto,
    id: number,
  ) {
    if (Object.values(data).length === 0) {
      throw new BadRequestException('Request body is empty');
    }

    const user = await this.usersService.findOneById(jwtPayload.sub);
    const task = await this.findOneByOwner(id, user.id);
    const completedAt = this.handleCompletedAtUpdate(
      task.is_completed,
      data.is_completed,
    );
    const payload = {
      ...data,
      completed_at: completedAt,
    };

    const mergedData = this.tasksRepo.merge(task, payload);
    const updatedData = this.tasksRepo.save(mergedData);
    return updatedData;
  }

  async deleteTask(jwtPayload: JwtAccessTokenPayloadDto, id: number) {
    const user = await this.usersService.findOneById(jwtPayload.sub);
    const deleteResult = await this.tasksRepo.delete({
      id: id,
      user: { id: user.id },
    });

    if (deleteResult.affected === 0) {
      throw new NotFoundException('Task not found');
    }
  }
}
