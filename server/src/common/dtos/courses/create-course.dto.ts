import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCourseDto {
    @MinLength(3)
    @MaxLength(100)
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    credits: number;

    @IsNumber()
    @IsPositive()
    @ApiProperty({
        example: 1,
        description: 'The major which the course is taught.',
    })
    major_id: number;
}
