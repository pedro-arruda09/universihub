import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classroom } from 'src/database/entities/classroom.entity';
import { CreateClassroomDto } from 'src/common/dtos/classrooms/create-classroom.dto';
import { UpdateClassroomDto } from 'src/common/dtos/classrooms/update-classroom.dto';

@Injectable()
export class ClassroomsService {
    constructor(
        @InjectRepository(Classroom)
        private readonly classroomRepository: Repository<Classroom>,
    ) {}

    async create(createClassroomDto: CreateClassroomDto) {
        try {
            const classroom = await this.classroomRepository.save(createClassroomDto);
            return classroom;
        } catch (error) {
            throw new Error('Could not create classroom');
        }
    }

    async findAll() {
        try {
            const classrooms = await this.classroomRepository.find({
                withDeleted: false,
            });

            if (!classrooms) {
                throw new Error('Classrooms not found');
            }

            return classrooms;
        } catch (error) {
            throw new Error('Could not fetch classrooms');
        }
    }

    async findOne(id: number) {
        try {
            const classroom = await this.classroomRepository.findOne({
                where: {
                    id,
                    deleted_at: null,
                },
            });

            if (!classroom) {
                throw new Error('Classroom not found');
            }

            return classroom;
        } catch (error) {
            throw new Error('Could not fetch classroom');
        }
    }

    async update(id: number, updateClassroomDto: UpdateClassroomDto) {
        try {
            const classroom = await this.classroomRepository.preload({
                id,
                ...updateClassroomDto,
            });

            if (!classroom) {
                throw new Error('Classroom not found');
            }

            return this.classroomRepository.save(classroom);
        } catch (error) {
            throw new Error('Could not update classroom');
        }
    }

    async remove(id: number) {
        try {
            const classroom = await this.classroomRepository.findOne({
                where: {
                    id,
                    deleted_at: null,
                },
            });

            if (!classroom) {
                throw new Error('Classroom not found');
            }

            return this.classroomRepository.softDelete(id);
        } catch (error) {
            throw new Error('Could not remove classroom');
        }
    }
}
