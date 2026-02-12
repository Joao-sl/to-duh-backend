import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { UsersService } from 'src/users/users.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAccessTokenPayloadDto } from 'src/auth/dto/jwt-token-payload.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepo: Repository<Project>,
    private readonly usersService: UsersService,
  ) {}

  async getOne(jwtPayload: JwtAccessTokenPayloadDto, id: number) {
    const user = await this.usersService.findOneById(jwtPayload.sub);
    const project = await this.projectsRepo.findOne({
      where: {
        id: id,
        is_archived: false,
        user: { id: user.id },
      },
    });

    if (!project) throw new NotFoundException('Project not found');

    return project;
  }

  async getList(jwtPayload: JwtAccessTokenPayloadDto) {
    const user = await this.usersService.findOneById(jwtPayload.sub);
    const projects = await this.projectsRepo.find({
      where: {
        is_archived: false,
        user: { id: user.id },
      },
    });

    return projects;
  }

  async create(jwtPayload: JwtAccessTokenPayloadDto, data: CreateProjectDto) {
    const user = await this.usersService.findOneById(jwtPayload.sub);
    const projectPayload = {
      user: user,
      ...data,
    };

    const project = await this.projectsRepo.save(projectPayload);

    return project;
  }

  async update(
    jwtPayload: JwtAccessTokenPayloadDto,
    id: number,
    data: UpdateProjectDto,
  ) {
    if (Object.values(data).length === 0) {
      throw new BadRequestException('Request body is empty');
    }

    const user = await this.usersService.findOneById(jwtPayload.sub);
    const project = await this.projectsRepo.findOne({
      where: {
        id: id,
        user: { id: user.id },
      },
    });

    if (!project) throw new NotFoundException('Project not found');

    const merged = this.projectsRepo.merge(project, data);
    const updatedProject = await this.projectsRepo.save(merged);

    return updatedProject;
  }

  async deleteById(jwtPayload: JwtAccessTokenPayloadDto, id: number) {
    const user = await this.usersService.findOneById(jwtPayload.sub);
    const project = await this.projectsRepo.delete({
      id: id,
      user: { id: user.id },
    });

    if (project.affected === 0) {
      throw new NotFoundException('Project not found');
    }
  }
}
