import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from 'src/database/entities/enrollment.entity';
import { CreateEnrollmentDto } from 'src/common/dtos/enrollments/create-enrollment.dto';

@Injectable()
export class EnrollmentsService {
    constructor(
        @InjectRepository(Enrollment)
        private readonly enrollmentRepository: Repository<Enrollment>,
    ) {}

    async create(createEnrollmentDto: CreateEnrollmentDto) {
        try {
            const enrollment = await this.enrollmentRepository.save(createEnrollmentDto);
            return enrollment;
        } catch (error) {
            throw new Error('Could not create enrollment.');
        }
    }

    async findAll() {
        try {
            const enrollments = await this.enrollmentRepository.find({
                withDeleted: false,
                relations: ['user_id'],
            });

            if (!enrollments) {
                throw new Error('Enrollments not found.');
            }

            return enrollments;
        } catch (error) {
            console.log(error, 'error');
            throw new Error('Could not fetch enrollments.');
        }
    }

    async findOne(id: number) {
        try {
            const enrollment = await this.enrollmentRepository.findOne({
                where: {
                    id,
                    deleted_at: null,
                },
            });

            if (!enrollment) {
                throw new Error('Enrollment not found.');
            }

            return enrollment;
        } catch (error) {
            throw new Error('Could not fetch enrollment.');
        }
    }

    async update(id: number) {
        try {
            const enrollment = await this.enrollmentRepository.preload({
                id,
            });

            if (!enrollment) {
                throw new Error('Enrollment not found.');
            }

            return this.enrollmentRepository.save(enrollment);
        } catch (error) {
            throw new Error('Could not update enrollment.');
        }
    }

    async remove(id: number) {
        try {
            const enrollment = await this.enrollmentRepository.findOne({
                where: {
                    id,
                    deleted_at: null,
                },
            });

            if (!enrollment) {
                throw new Error('Enrollment not found.');
            }

            return this.enrollmentRepository.softDelete(id);
        } catch (error) {
            throw new Error('Could not remove enrollment.');
        }
    }
}
