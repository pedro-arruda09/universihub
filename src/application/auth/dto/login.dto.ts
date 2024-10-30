import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Role } from 'src/domain/enum/roles.enum';

export class LoginDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(Role)
    role: Role;
}
