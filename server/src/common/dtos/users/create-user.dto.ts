import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/common/enum/roles.enum';

export class CreateUserDto {
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
    address?: string;

    @IsNumber()
    @IsPositive()
    @ApiProperty({
        example: 1,
        description: 'The major which the user belongs.',
    })
    major_id: number;

    @IsEnum(Role)
    role?: Role;
}
