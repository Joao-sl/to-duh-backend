import { Repository } from 'typeorm';
import { Section } from './entities/section.entity';
import { UsersService } from 'src/users/users.service';
import { JwtAccessTokenPayloadDto } from 'src/auth/dto/jwt-token-payload.dto';
import { CreateSectionDto } from './dto/create-section.dto';
import { ProjectsService } from 'src/projects/projects.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateSectionDto } from './dto/update-section.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(Section)
    private readonly sectionsRepo: Repository<Section>,
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService,
  ) {}

  async findOneByIdAndUserId(id: number, userId: number) {
    const section = await this.sectionsRepo.findOne({
      where: {
        id: id,
        user: { id: userId },
      },
    });

    if (!section) throw new NotFoundException('Section not found');

    return section;
  }

  async findAllByIdAndUserId(userId: number) {
    const section = await this.sectionsRepo.find({
      where: {
        user: { id: userId },
      },
    });

    return section;
  }

  async getOne(jwtPayload: JwtAccessTokenPayloadDto, id: number) {
    const user = await this.usersService.findOneById(jwtPayload.sub);
    const section = await this.findOneByIdAndUserId(id, user.id);
    return section;
  }

  async getList(jwtPayload: JwtAccessTokenPayloadDto) {
    const user = await this.usersService.findOneById(jwtPayload.sub);
    const section = await this.findAllByIdAndUserId(user.id);
    return section;
  }

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

  async update(
    jwtPayload: JwtAccessTokenPayloadDto,
    data: UpdateSectionDto,
    id: number,
  ) {
    if (Object.values(data).length === 0) {
      throw new BadRequestException('Request body is empty');
    }

    const user = await this.usersService.findOneById(jwtPayload.sub);
    const section = await this.findOneByIdAndUserId(id, user.id);
    const merged = this.sectionsRepo.merge(section, data);
    const updatedSection = this.sectionsRepo.save(merged);

    return updatedSection;
  }

  async deleteById(jwtPayload: JwtAccessTokenPayloadDto, id: number) {
    const user = await this.usersService.findOneById(jwtPayload.sub);
    const section = await this.sectionsRepo.delete({
      id: id,
      user: { id: user.id },
    });

    if (section.affected === 0) {
      throw new NotFoundException('Section not found');
    }
  }
}
