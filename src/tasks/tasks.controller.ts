import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ResponseTaskDto } from './dto/response-task.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentAuthToken } from 'src/auth/params/current-auth-token.param';
import { JwtAccessTokenPayloadDto } from 'src/auth/dto/jwt-token-payload.dto';
import {
  Body,
  Controller,
  Post,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
@SerializeOptions({ type: ResponseTaskDto })
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Post()
  createTask(
    @CurrentAuthToken() currentToken: JwtAccessTokenPayloadDto,
    @Body() data: CreateTaskDto,
  ) {
    return this.taskService.create(currentToken, data);
  }
}
