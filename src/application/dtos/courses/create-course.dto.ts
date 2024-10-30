import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCourseDto {
    @MinLength(3)
    @MaxLength(100)
    @IsNotEmpty()
    @IsString()
    name: string;
}
