import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Grade } from 'src/infrastructure/entities/grade.entity';
import { Repository } from 'typeorm';
import { CreateGradeDto } from 'src/application/dtos/grades/create-grade.dto';
import { UpdateGradeDto } from 'src/application/dtos/grades/update-grade-dto';

@Injectable()
export class GradesService {
    constructor(
        @InjectRepository(Grade)
        private readonly gradeRepository: Repository<Grade>,
    ) {}

    async create(createGradeDto: CreateGradeDto) {
        try {
            const grade = await this.gradeRepository.save(createGradeDto);
            return grade;
        } catch (error) {
            throw new Error('Could not create grade');
        }
    }

    async findAll() {
        try {
            const grades = await this.gradeRepository.find({
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
