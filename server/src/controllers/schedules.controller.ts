import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { SchedulesService } from '../services/schedules.service';
import { CreateScheduleDto } from '../common/dtos/schedules/create-schedule.dto';
import { UpdateScheduleDto } from '../common/dtos/schedules/update-schedule.dto';

@Controller('schedules')
export class SchedulesController {
    constructor(private readonly schedulesService: SchedulesService) {}

    @Post()
    create(@Body() dto: CreateScheduleDto) {
        return this.schedulesService.create(dto);
    }

    @Get()
    findAll() {
        return this.schedulesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.schedulesService.findOne(Number(id));
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateScheduleDto) {
        return this.schedulesService.update(Number(id), dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.schedulesService.remove(Number(id));
    }
}
