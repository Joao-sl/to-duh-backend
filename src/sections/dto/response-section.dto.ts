import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseSectionDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  is_archived: boolean;

  @Expose()
  project_id: number;

  @Expose()
  user_id: number;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
