import { Role } from 'src/common/enum/roles.enum';
import { GradesService } from 'src/services/grades.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthRoleGuard } from '../auth/guards/auth.role.guard';
import { AuthTokenGuard } from '../auth/guards/auth.token.guard';
import { CreateGradeDto } from '../common/dtos/grades/create-grade.dto';
import { UpdateGradeDto } from '../common/dtos/grades/update-grade-dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('grades')
@Controller('grades')
export class GradesController {
    constructor(private readonly gradesService: GradesService) {}

    @Post()
    @Roles(Role.PROFESSOR)
    @UseGuards(AuthRoleGuard)
    create(@Body() createGradeDto: CreateGradeDto) {
        return this.gradesService.create(createGradeDto);
    }

    @Get()
    @Roles(Role.PROFESSOR)
    @UseGuards(AuthRoleGuard)
    findAll(@Param('id') enrollment_id: string) {
        return this.gradesService.findAll(+enrollment_id);
    }

    @Get('student/:id')
    @UseGuards(AuthTokenGuard)
    findStudentGrades(@Param('id') user_id: string) {
        return this.gradesService.findStudentGrades(+user_id);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.gradesService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateGradeDto: UpdateGradeDto) {
        return this.gradesService.update(+id, updateGradeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.gradesService.remove(+id);
    }
}
