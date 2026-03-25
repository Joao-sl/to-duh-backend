import { Exclude, Expose, Type } from 'class-transformer';
import { ResponseProjectDto } from 'src/projects/dto/response-project.dto';
import { ResponseSectionDto } from 'src/sections/dto/response-section.dto';
import { ResponseTaskDto } from 'src/tasks/dto/response-task.dto';

@Exclude()
export class ResponseSectionWithTasksDto extends ResponseSectionDto {
  @Expose()
  @Type(() => ResponseTaskDto)
  tasks: ResponseTaskDto[];
}

@Exclude()
export class ResponseProjectDetailsDto extends ResponseProjectDto {
  @Expose()
  @Type(() => ResponseSectionWithTasksDto)
  sections: ResponseSectionWithTasksDto[];

  @Expose()
  @Type(() => ResponseTaskDto)
  tasks_without_sections: ResponseTaskDto[];
}
