import { Module } from '@nestjs/common';
import { ProfessorsController } from 'src/application/controllers/professors.controller';
import { ProfessorsService } from 'src/domain/services/professors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professor } from 'src/infrastructure/entities/professor.entity';
import { CoursesModule } from './courses.module';
import { ValidateEmailUtils } from '../utils/validate-email.utils';
import { Student } from 'src/infrastructure/entities/student.entity';
import { Course } from 'src/infrastructure/entities/course.entity';
import { CoursesService } from '../services/courses.service';

@Module({
    imports: [TypeOrmModule.forFeature([Professor, Student, Course])],
    controllers: [ProfessorsController],
    providers: [ProfessorsService, ValidateEmailUtils, CoursesService],
})
export class ProfessorsModule {}
