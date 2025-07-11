import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateMajorDto } from 'src/common/dtos/majors/create-major.dto';
import { UpdateMajorDto } from 'src/common/dtos/majors/update-major.dto';
import { MajorsService } from 'src/services/majors.service';

@ApiTags('majors')
@Controller('majors')
export class MajorsController {
    constructor(private readonly majorsService: MajorsService) {}

    @Post()
    create(@Body() createMajorDto: CreateMajorDto) {
        return this.majorsService.create(createMajorDto);
    }

    @Get()
    findAll() {
        return this.majorsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.majorsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateMajorDto: UpdateMajorDto) {
        return this.majorsService.update(+id, updateMajorDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.majorsService.remove(+id);
    }
}
