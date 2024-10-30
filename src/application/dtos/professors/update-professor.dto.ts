import { CreateProfessorDto } from './create-professor.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateProfessorDto extends PartialType(CreateProfessorDto) {}
