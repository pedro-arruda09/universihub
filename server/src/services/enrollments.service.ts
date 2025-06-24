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
                relations: ['classroom_id', 'classroom_id.major_id'],
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

    mountUserEnrollmentsData(enrollments) {
        const userEnrollments = enrollments.map(enrollment => {
            console.log(enrollment, 'enrollment');
            return {
                enrollment: {
                    id: enrollment.id,
                },
                classroom: {
                    id: enrollment.classroom_id.id,
                    year: enrollment.classroom_id.year,
                    semester: enrollment.classroom_id.semester,
                },
                major: {
                    id: enrollment.classroom_id.major_id.id,
                    name: enrollment.classroom_id.major_id.name,
                },
                professor: {
                    id: enrollment.classroom_id.user_id.id,
                    name: enrollment.classroom_id.user_id.name,
                },
            };
        });

        return userEnrollments;
    }

    async findByUserId(userId: number) {
        try {
            const enrollments = await this.enrollmentRepository
                .createQueryBuilder('enrollment')
                .leftJoinAndSelect('enrollment.classroom_id', 'classroom')
                .leftJoinAndSelect('classroom.major_id', 'major')
                .leftJoinAndSelect('classroom.user_id', 'professor')
                .where('enrollment.user_id = :userId', { userId })
                .andWhere('enrollment.deleted_at IS NULL')
                .getMany();

            if (!enrollments) {
                throw new Error('User enrollments not found.');
            }

            const userEnrollments = this.mountUserEnrollmentsData(enrollments);

            return userEnrollments;
        } catch (error) {
            throw new Error('Could not fetch user enrollments');
        }
    }
}
