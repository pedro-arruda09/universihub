import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/infrastructure/entities/course.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from 'src/application/dtos/courses/create-course.dto';
import { UpdateCourseDto } from 'src/application/dtos/courses/update-course.dto';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
    ) {}

    async create(createCourseDto: CreateCourseDto) {
        try {
            const course = await this.courseRepository.save(createCourseDto);
            return course;
        } catch (error) {
            throw new Error('Could not create course');
        }
    }

    async findAll() {
        try {
            const courses = await this.courseRepository.find({
                withDeleted: false,
            });

            if (!courses) {
                throw new Error('Courses not found');
            }

            return courses;
        } catch (error) {
            throw new Error('Could not fetch courses');
        }
    }

    async findOne(id: number) {
        try {
            const course = await this.courseRepository.findOne({
                where: {
                    id,
                    deleted_at: null,
                },
            });

            if (!course) {
                throw new Error('Course not found');
            }

            return course;
        } catch (error) {
            throw new Error('Could not fetch course');
        }
    }

    async update(id: number, updateCourseDto: UpdateCourseDto) {
        try {
            const course = await this.courseRepository.preload({
                id,
                ...updateCourseDto,
            });

            if (!course) {
                throw new Error('Course not found');
            }

            return this.courseRepository.save(course);
        } catch (error) {
            throw new Error('Could not update course');
        }
    }

    async remove(id: number) {
        try {
            const course = await this.courseRepository.findOne({
                where: {
                    id,
                    deleted_at: null,
                },
            });

            if (!course) {
                throw new Error('Course not found');
            }

            return this.courseRepository.softDelete(id);
        } catch (error) {
            throw new Error('Could not remove course');
        }
    }
}
