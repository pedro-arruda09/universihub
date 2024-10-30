import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
import { Role } from 'src/domain/enum/roles.enum';

export class CreateProfessorDto {
    @MinLength(3)
    @MaxLength(100)
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsString()
    birth_date: string;

    @IsString()
    address: string;

    @IsNumber()
    @IsPositive()
    @ApiProperty({
        example: 1,
        description: 'The course which the professor teaches.',
    })
    course_id: number;

    @IsEnum(Role)
    @IsOptional()
    role?: Role;
}
