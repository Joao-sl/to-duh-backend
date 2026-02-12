import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ResponseProjectDto } from 'src/projects/dto/response-project.dto';
import { CurrentAuthToken } from 'src/auth/params/current-auth-token.param';
import { JwtAccessTokenPayloadDto } from 'src/auth/dto/jwt-token-payload.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';

@Controller('sections')
@UseGuards(JwtAuthGuard)
@SerializeOptions({ type: ResponseProjectDto })
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Get(':id')
  getOne(
    @CurrentAuthToken() currentToken: JwtAccessTokenPayloadDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.sectionsService.getOne(currentToken, id);
  }

  @Get()
  getList(@CurrentAuthToken() currentToken: JwtAccessTokenPayloadDto) {
    return this.sectionsService.getList(currentToken);
  }

  @Post()
  createSection(
    @CurrentAuthToken() currentToken: JwtAccessTokenPayloadDto,
    @Body() data: CreateSectionDto,
  ) {
    return this.sectionsService.create(currentToken, data);
  }

  @Patch(':id')
  updateSection(
    @CurrentAuthToken() currentToken: JwtAccessTokenPayloadDto,
    @Body() data: UpdateSectionDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.sectionsService.update(currentToken, data, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(
    @CurrentAuthToken() currentToken: JwtAccessTokenPayloadDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.sectionsService.deleteById(currentToken, id);
  }
}
