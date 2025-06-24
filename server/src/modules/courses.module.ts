import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesService } from '../services/courses.service';
import { Course } from 'src/database/entities/course.entity';
import { CoursesController } from 'src/controllers/courses.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Course])],
    controllers: [CoursesController],
    providers: [CoursesService],
})
export class CoursesModule {}
