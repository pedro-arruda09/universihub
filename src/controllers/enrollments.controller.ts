import { EnrollmentsService } from 'src/services/enrollments.service';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateEnrollmentDto } from '../common/dtos/enrollments/create-enrollment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('enrollments')
@Controller('enrollments')
export class EnrollmentsController {
    constructor(private readonly enrollmentsService: EnrollmentsService) {}

    @Post()
    create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
        return this.enrollmentsService.create(createEnrollmentDto);
    }

    @Get()
    findAll() {
        return this.enrollmentsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.enrollmentsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string) {
        return this.enrollmentsService.update(+id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.enrollmentsService.remove(+id);
    }
}
