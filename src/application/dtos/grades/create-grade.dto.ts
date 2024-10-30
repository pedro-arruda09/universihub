import { IsDate, IsNumber, IsPositive } from 'class-validator';

export class CreateGradeDto {
    @IsNumber()
    @IsPositive()
    grade: number;

    @IsDate()
    assessment_date: Date;

    @IsNumber()
    @IsPositive()
    enrollment_id: number;
}
