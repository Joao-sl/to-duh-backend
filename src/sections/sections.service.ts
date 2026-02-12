import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Section } from './entities/section.entity';
import { UsersService } from 'src/users/users.service';
import { JwtAccessTokenPayloadDto } from 'src/auth/dto/jwt-token-payload.dto';
import { CreateSectionDto } from './dto/create-section.dto';
import { ProjectsService } from 'src/projects/projects.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(Section)
    private readonly sectionsRepo: Repository<Section>,
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService,
  ) {}

  async create(jwtPayload: JwtAccessTokenPayloadDto, data: CreateSectionDto) {
    const user = await this.usersService.findOneById(jwtPayload.sub);
    const project = await this.projectsService.findOneByIdAndUserId(
      data.project_id,
      user.id,
    );

    const sectionPayload = {
      name: data.name,
      user: user,
      project: project,
    };

    const section = await this.sectionsRepo.save(sectionPayload);
    return section;
  }
}
