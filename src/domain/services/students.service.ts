import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/infrastructure/entities/student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from 'src/application/dtos/students/create-student.dto';
import { UpdateStudentDto } from 'src/application/dtos/students/update-student.dto';
import { HashingService } from 'src/application/auth/hashing/hashing.service';
import { TokenPayloadDto } from 'src/application/auth/dto/token-payload.dto';
import { ValidateEmailUtils } from '../utils/validate-email.utils';
import { CoursesService } from './courses.service';

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
        private readonly hashingService: HashingService,
        private readonly validateEmailUtils: ValidateEmailUtils,
        private readonly courseService: CoursesService,
    ) {}

    async create(createStudentDto: CreateStudentDto) {
        try {
            const emailExists = await this.validateEmailUtils.validateEmail(createStudentDto.email);

            if (emailExists) {
                throw new Error('Email already exists.');
            }

            const courseId = createStudentDto.course_id;
            const course = await this.courseService.findOne(courseId);

            if (!course) {
                throw new Error('Course not found.');
            }

            const passwordHash = await this.hashingService.hash(createStudentDto.password);

            delete createStudentDto.password;

            const studentData = {
                ...createStudentDto,
                password_hash: passwordHash,
            };

            const student = this.studentRepository.create(studentData);
            await this.studentRepository.save(student);
            return student;
        } catch (error) {
            throw new Error('Could not create student.');
        }
    }

    async findAll() {
        try {
            const students = await this.studentRepository.find({
                withDeleted: false,
            });

            if (!students) {
                throw new Error('Students not found.');
            }

            return students;
        } catch (error) {
            throw new Error('Could not fetch students.');
        }
    }

    async findOne(id: number) {
        try {
            const student = await this.studentRepository.findOne({
                where: {
                    id,
                    deleted_at: null,
                },
            });

            if (!student) {
                throw new Error('Student not found.');
            }

            return student;
        } catch (error) {
            throw new Error('Could not fetch student.');
        }
    }

    async update(id: number, updateStudentDto: UpdateStudentDto, tokenPayload: TokenPayloadDto) {
        try {
            const student = await this.studentRepository.preload({
                id,
                ...updateStudentDto,
            });

            if (!student) {
                throw new Error('Student not found.');
            }

            if (student.id !== tokenPayload.sub) {
                throw new Error('Unauthorized permission.');
            }

            return this.studentRepository.save(student);
        } catch (error) {
            throw new Error('Could not update student.');
        }
    }

    async remove(id: number, tokenPayload: TokenPayloadDto) {
        try {
            const student = await this.studentRepository.findOne({
                where: {
                    id,
                    deleted_at: null,
                },
            });

            if (!student) {
                throw new Error('Student not found.');
            }

            if (student.id !== tokenPayload.sub) {
                throw new Error('Unauthorized permission.');
            }

            await this.studentRepository.softDelete(id);

            return student;
        } catch (error) {
            throw new Error('Could not remove student.');
        }
    }
}
