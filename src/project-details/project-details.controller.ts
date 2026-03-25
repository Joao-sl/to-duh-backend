import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProjectDetailsService } from './project-details.service';
import { CurrentAuthToken } from 'src/auth/params/current-auth-token.param';
import { JwtAccessTokenPayloadDto } from 'src/auth/dto/jwt-token-payload.dto';
import { ResponseProjectDetailsDto } from './dto/response-project-details.dto';
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';

@Controller()
@UseGuards(JwtAuthGuard)
export class ProjectDetailsController {
  constructor(private readonly projectDetailsService: ProjectDetailsService) {}

  @SerializeOptions({ type: ResponseProjectDetailsDto })
  @Get('/project/:projectId/board')
  getBoard(
    @CurrentAuthToken() currentToken: JwtAccessTokenPayloadDto,
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    return this.projectDetailsService.getBoard(currentToken, projectId);
  }
}
