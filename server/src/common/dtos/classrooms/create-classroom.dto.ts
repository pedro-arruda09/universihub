import { IsNumber, IsPositive, IsString } from 'class-validator';

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

    @IsString()
    room_code: string;
}
