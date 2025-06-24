import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMajorDto } from 'src/common/dtos/majors/create-major.dto';
import { UpdateMajorDto } from 'src/common/dtos/majors/update-major.dto';
import { Major } from 'src/database/entities/major.entity';

@Injectable()
export class MajorsService {
    constructor(
        @InjectRepository(Major)
        private readonly majorRepository: Repository<Major>,
    ) {}

    async create(createMajorDto: CreateMajorDto) {
        try {
            const major = await this.majorRepository.save(createMajorDto);
            return major;
        } catch (error) {
            throw new Error('Could not create major');
        }
    }

    async findAll() {
        try {
            const majors = await this.majorRepository.find({
                withDeleted: false,
            });

            if (!majors) {
                throw new Error('Majors not found');
            }

            return majors;
        } catch (error) {
            throw new Error('Could not fetch majors');
        }
    }

    async findOne(id: number) {
        try {
            const major = await this.majorRepository.findOne({
                where: {
                    id,
                    deleted_at: null,
                },
            });

            if (!major) {
                throw new Error('Major not found');
            }

            return major;
        } catch (error) {
            throw new Error('Could not fetch major');
        }
    }

    async update(id: number, updateMajorDto: UpdateMajorDto) {
        try {
            const major = await this.majorRepository.preload({
                id,
                ...updateMajorDto,
            });

            if (!major) {
                throw new Error('Major not found');
            }

            return this.majorRepository.save(major);
        } catch (error) {
            throw new Error('Could not update major');
        }
    }

    async remove(id: number) {
        try {
            const major = await this.majorRepository.findOne({
                where: {
                    id,
                    deleted_at: null,
                },
            });

            if (!major) {
                throw new Error('Major not found');
            }

            return this.majorRepository.softDelete(id);
        } catch (error) {
            throw new Error('Could not remove major');
        }
    }
}
