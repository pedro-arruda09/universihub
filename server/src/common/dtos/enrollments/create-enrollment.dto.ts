import { IsNumber, IsPositive } from 'class-validator';

export class CreateEnrollmentDto {
    @IsNumber()
    @IsPositive()
    classroom_id: number;

    @IsNumber()
    @IsPositive()
    user_id: number;
}
