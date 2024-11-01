import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Grade } from 'src/database/entities/grade.entity';
import { Enrollment } from 'src/database/entities/enrollment.entity';
import { UpdateGradeDto } from 'src/common/dtos/grades/update-grade-dto';
import { CreateGradeDto } from 'src/common/dtos/grades/create-grade.dto';

@Injectable()
export class GradesService {
    constructor(
        @InjectRepository(Grade)
        private readonly gradeRepository: Repository<Grade>,
        @InjectRepository(Enrollment)
        private readonly enrollmentRepository: Repository<Enrollment>,
    ) {}

    async create(createGradeDto: CreateGradeDto) {
        try {
            const grade = await this.gradeRepository.save(createGradeDto);
            return grade;
        } catch (error) {
            throw new Error('Could not create grade');
        }
    }

    async findAll(enrollment_id: number) {
        try {
            const grades = await this.gradeRepository.find({
                where: {
                    enrollment_id,
                },
                withDeleted: false,
            });

            if (!grades) {
                throw new Error('Grades not found');
            }

            return grades;
        } catch (error) {
            throw new Error('Could not fetch grades');
        }
    }

    async findStudentGrades(user_id: number) {
        try {
            const enrollment = await this.enrollmentRepository.findOneBy({ user_id });

            if (!enrollment) {
                throw new Error('Enrollment not found');
            }

            const grades = await this.gradeRepository.find({
                where: {
                    enrollment_id: enrollment.id,
                },
                withDeleted: false,
            });

            if (!grades) {
                throw new Error('Grades not found');
            }

            return grades;
        } catch (error) {
            throw new Error('Could not fetch grades');
        }
    }

    async findOne(id: number) {
        try {
            const grade = await this.gradeRepository.findOne({
                where: {
                    id,
                    deleted_at: null,
                },
            });

            if (!grade) {
                throw new Error('Grade not found');
            }

            return grade;
        } catch (error) {
            throw new Error('Could not fetch grade');
        }
    }

    async update(id: number, updateGradeDto: UpdateGradeDto) {
        try {
            const grade = await this.gradeRepository.preload({
                id,
                ...updateGradeDto,
            });

            if (!grade) {
                throw new Error('Grade not found');
            }

            return this.gradeRepository.save(grade);
        } catch (error) {
            throw new Error('Could not update grade');
        }
    }

    async remove(id: number) {
        try {
            const grade = await this.gradeRepository.findOne({
                where: {
                    id,
                    deleted_at: null,
                },
            });

            if (!grade) {
                throw new Error('Grade not found');
            }

            return this.gradeRepository.softDelete(id);
        } catch (error) {
            throw new Error('Could not remove grade');
        }
    }
}
