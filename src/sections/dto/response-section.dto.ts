import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class Section {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  project_id: number;

  @Expose()
  user_id: number;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
