import { Role } from 'src/common/enum/roles.enum';

export class TokenPayloadDto {
    sub: number;
    email: string;
    role: Role;
    iat: number;
    exp: number;
    aud: string;
    iss: string;
}
