import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'src/database/entities/subject.entity';
import { CreateSubjectDto } from 'src/common/dtos/subjects/create-subject.dto';
import { UpdateSubjectDto } from 'src/common/dtos/subjects/update-subject.dto';

@Injectable()
export class SubjectsService {
    constructor(
        @InjectRepository(Subject)
        private readonly subjectRepository: Repository<Subject>,
    ) {}

    async create(createSubjectDto: CreateSubjectDto) {
        try {
            const subject = await this.subjectRepository.save(createSubjectDto);
            return subject;
        } catch (error) {
            throw new Error('Could not create subject');
        }
    }

    async findAll() {
        try {
            const subjects = await this.subjectRepository.find({
                withDeleted: false,
            });

            if (!subjects) {
                throw new Error('Subjects not found');
            }

            return subjects;
        } catch (error) {
            throw new Error('Could not fetch subjects');
        }
    }

    async findOne(id: number) {
        try {
            const subject = await this.subjectRepository.findOne({
                where: {
                    id,
                    deleted_at: null,
                },
            });

            if (!subject) {
                throw new Error('Subject not found');
            }

            return subject;
        } catch (error) {
            throw new Error('Could not fetch subject');
        }
    }

    async update(id: number, updateSubjectDto: UpdateSubjectDto) {
        try {
            const subject = await this.subjectRepository.preload({
                id,
                ...updateSubjectDto,
            });

            if (!subject) {
                throw new Error('Subject not found');
            }

            return this.subjectRepository.save(subject);
        } catch (error) {
            throw new Error('Could not update subject');
        }
    }

    async remove(id: number) {
        try {
            const subject = await this.subjectRepository.findOne({
                where: {
                    id,
                    deleted_at: null,
                },
            });

            if (!subject) {
                throw new Error('Subject not found');
            }

            return this.subjectRepository.softDelete(id);
        } catch (error) {
            throw new Error('Could not remove subject');
        }
    }
}
