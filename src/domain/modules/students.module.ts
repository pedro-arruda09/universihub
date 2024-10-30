import { Module } from '@nestjs/common';
import { StudentsController } from 'src/application/controllers/students.controller';
import { StudentsService } from '../services/students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../../infrastructure/entities/student.entity';
import { ValidateEmailUtils } from '../utils/validate-email.utils';
import { CoursesService } from '../services/courses.service';
import { Professor } from 'src/infrastructure/entities/professor.entity';
import { Course } from 'src/infrastructure/entities/course.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Student, Professor, Course])],
    controllers: [StudentsController],
    providers: [StudentsService, ValidateEmailUtils, CoursesService],
    exports: [StudentsService],
})
export class StudentsModule {}
