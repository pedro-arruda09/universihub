import { IsNumber, IsPositive } from 'class-validator';

export class CreateClassroomDto {
    @IsNumber()
    @IsPositive()
    year: number;

    @IsNumber()
    semester: number;

    @IsNumber()
    @IsPositive()
    subject_id: number;

    @IsNumber()
    @IsPositive()
    user_id: number;
}
