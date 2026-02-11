import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { UsersService } from 'src/users/users.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtAccessTokenPayloadDto } from 'src/auth/dto/jwt-token-payload.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepo: Repository<Project>,
    private readonly usersService: UsersService,
  ) {}

  async create(jwtPayload: JwtAccessTokenPayloadDto, data: CreateProjectDto) {
    const user = await this.usersService.findOneById(jwtPayload.sub);

    const projectPayload = {
      user_id: user.id,
      ...data,
    };

    const project = await this.projectsRepo.save(projectPayload);

    return project;
  }
}
