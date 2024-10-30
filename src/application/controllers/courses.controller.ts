import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoursesService } from 'src/domain/services/courses.service';
import { CreateCourseDto } from '../dtos/courses/create-course.dto';
import { UpdateCourseDto } from '../dtos/courses/update-course.dto';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Post()
    create(@Body() createCourseDto: CreateCourseDto) {
        return this.coursesService.create(createCourseDto);
    }

    @Get()
    findAll() {
        return this.coursesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.coursesService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
        return this.coursesService.update(+id, updateCourseDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coursesService.remove(+id);
    }
}
