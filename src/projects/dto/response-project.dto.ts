import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseProjectDto {
  @Expose()
  id: number;

  @Expose()
  user_id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  is_favorite: boolean;

  @Expose()
  is_archived: boolean;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
