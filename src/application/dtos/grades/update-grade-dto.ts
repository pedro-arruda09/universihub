import { CreateGradeDto } from './create-grade.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateGradeDto extends PartialType(CreateGradeDto) {}
