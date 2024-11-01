import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsPositive } from 'class-validator';

export class CreateGradeDto {
    @IsNumber()
    @IsPositive()
    grade: number;

    @IsDate()
    @Type(() => Date)
    assessment_date: Date;

    @IsNumber()
    @IsPositive()
    enrollment_id: number;
}
