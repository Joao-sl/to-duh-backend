import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ResponseProjectDto } from './dto/response-project.dto';
import { CurrentAuthToken } from 'src/auth/params/current-auth-token.param';
import { JwtAccessTokenPayloadDto } from 'src/auth/dto/jwt-token-payload.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';

@SerializeOptions({ type: ResponseProjectDto })
@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get(':id')
  getProject(
    @CurrentAuthToken() currentToken: JwtAccessTokenPayloadDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.projectsService.getOne(currentToken, id);
  }

  @Get()
  getProjectList(@CurrentAuthToken() currentToken: JwtAccessTokenPayloadDto) {
    return this.projectsService.getList(currentToken);
  }

  @Post()
  createProject(
    @CurrentAuthToken() currentToken: JwtAccessTokenPayloadDto,
    @Body() data: CreateProjectDto,
  ) {
    return this.projectsService.create(currentToken, data);
  }
}
