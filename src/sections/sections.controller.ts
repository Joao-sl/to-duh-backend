import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ResponseSectionDto } from './dto/response-section.dto';
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
  Query,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { SectionQueryDto } from './dto/query-params.dto';

@Controller('sections')
@UseGuards(JwtAuthGuard)
@SerializeOptions({ type: ResponseSectionDto })
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
  getList(
    @CurrentAuthToken() currentToken: JwtAccessTokenPayloadDto,
    @Query() queryParams: SectionQueryDto,
  ) {
    return this.sectionsService.getList(currentToken, queryParams);
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
