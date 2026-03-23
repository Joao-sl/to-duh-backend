import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ResponseTaskDto } from './dto/response-task.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
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
import { TaskQueryDto } from './dto/query-params.dto';

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
  getList(
    @CurrentAuthToken() currentToken: JwtAccessTokenPayloadDto,
    @Query() queryParams: TaskQueryDto,
  ) {
    return this.taskService.getList(currentToken, queryParams);
  }

  @Post()
  createTask(
    @CurrentAuthToken() currentToken: JwtAccessTokenPayloadDto,
    @Body() data: CreateTaskDto,
  ) {
    return this.taskService.create(currentToken, data);
  }

  @Patch(':id')
  updateTask(
    @CurrentAuthToken() currentToken: JwtAccessTokenPayloadDto,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateTaskDto,
  ) {
    return this.taskService.update(currentToken, data, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTask(
    @CurrentAuthToken() currentToken: JwtAccessTokenPayloadDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.taskService.deleteTask(currentToken, id);
  }
}
