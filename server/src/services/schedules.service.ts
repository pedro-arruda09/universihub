import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../database/entities/schedule.entity';
import { CreateScheduleDto } from '../common/dtos/schedules/create-schedule.dto';
import { UpdateScheduleDto } from '../common/dtos/schedules/update-schedule.dto';

@Injectable()
export class SchedulesService {
    constructor(
        @InjectRepository(Schedule)
        private readonly schedulesRepository: Repository<Schedule>,
    ) {}

    async create(dto: CreateScheduleDto): Promise<Schedule> {
        const schedule = this.schedulesRepository.create(dto);
        return this.schedulesRepository.save(schedule);
    }

    async findAll(): Promise<Schedule[]> {
        return this.schedulesRepository.find();
    }

    async findOne(id: number): Promise<Schedule | null> {
        return this.schedulesRepository.findOneBy({ id });
    }

    async update(id: number, dto: UpdateScheduleDto): Promise<Schedule | null> {
        await this.schedulesRepository.update(id, dto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.schedulesRepository.delete(id);
    }
}
