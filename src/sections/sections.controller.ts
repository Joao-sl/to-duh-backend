import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtAccessTokenPayloadDto } from 'src/auth/dto/jwt-token-payload.dto';
import { CurrentAuthToken } from 'src/auth/params/current-auth-token.param';
import { ResponseProjectDto } from 'src/projects/dto/response-project.dto';
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
}
