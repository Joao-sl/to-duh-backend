import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ResponseTaskDto } from './dto/response-task.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
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

@Controller('tasks')
@UseGuards(JwtAuthGuard)
@SerializeOptions({ type: ResponseTaskDto })
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get(':id')
  getOne(
    @CurrentAuthToken() currentToken: JwtAccessTokenPayloadDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.taskService.getOne(currentToken, id);
  }

  @Get()
  getList(@CurrentAuthToken() currentToken: JwtAccessTokenPayloadDto) {
    return this.taskService.getList(currentToken);
  }

  @Post()
  createTask(
    @CurrentAuthToken() currentToken: JwtAccessTokenPayloadDto,
    @Body() data: CreateTaskDto,
  ) {
    return this.taskService.create(currentToken, data);
  }
}
