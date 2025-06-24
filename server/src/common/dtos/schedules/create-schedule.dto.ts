import { IsInt, IsString, Matches } from 'class-validator';

export class CreateScheduleDto {
  @IsInt()
  day_of_week: number;

  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'start_time must be in HH:mm format' })
  start_time: string;

  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'end_time must be in HH:mm format' })
  end_time: string;
}
