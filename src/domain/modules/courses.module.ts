import { Module } from '@nestjs/common';
import { CoursesController } from 'src/application/controllers/courses.controller';
import { CoursesService } from '../services/courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../../infrastructure/entities/course.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Course])],
    controllers: [CoursesController],
    providers: [CoursesService],
    exports: [CoursesService],
})
export class CoursesModule {}
