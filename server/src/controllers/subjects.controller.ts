import { SubjectsService } from 'src/services/subjects.service';
import { CreateSubjectDto } from '../common/dtos/subjects/create-subject.dto';
import { UpdateSubjectDto } from '../common/dtos/subjects/update-subject.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('subjects')
@Controller('subjects')
export class SubjectsController {
    constructor(private readonly subjectsService: SubjectsService) {}

    @Post()
    create(@Body() createSubjectDto: CreateSubjectDto) {
        return this.subjectsService.create(createSubjectDto);
    }

    @Get()
    findAll() {
        return this.subjectsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.subjectsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
        return this.subjectsService.update(+id, updateSubjectDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.subjectsService.remove(+id);
    }
}
