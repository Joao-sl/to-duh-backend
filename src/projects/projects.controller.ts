import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ResponseProjectDto } from './dto/response-project.dto';
import { CurrentAuthToken } from 'src/auth/params/current-auth-token.param';
import { JwtAccessTokenPayloadDto } from 'src/auth/dto/jwt-token-payload.dto';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
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
  getProjectList(
    @CurrentAuthToken() currentToken: JwtAccessTokenPayloadDto,
    @Query('archived', new DefaultValuePipe(false), ParseBoolPipe)
    archived: boolean,
  ) {
    return this.projectsService.getList(currentToken, archived);
  }

  @Post()
  createProject(
    @CurrentAuthToken() currentToken: JwtAccessTokenPayloadDto,
    @Body() data: CreateProjectDto,
  ) {
    return this.projectsService.create(currentToken, data);
  }

  @Patch(':id')
  updateProject(
    @CurrentAuthToken() currentToken: JwtAccessTokenPayloadDto,
    @Body() data: UpdateProjectDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.projectsService.update(currentToken, id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteProject(
    @CurrentAuthToken() currentToken: JwtAccessTokenPayloadDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.projectsService.deleteById(currentToken, id);
  }
}
