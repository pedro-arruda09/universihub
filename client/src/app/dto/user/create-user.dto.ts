import { Role } from '../../enums/role';

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  birth_date: string;
  address?: string;
  major_id: number;
  role?: Role;
  picture?: string;
}
