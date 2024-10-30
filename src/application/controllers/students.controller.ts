import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { StudentsService } from 'src/domain/services/students.service';
import { CreateStudentDto } from '../dtos/students/create-student.dto';
import { UpdateStudentDto } from '../dtos/students/update-student.dto';
import { AuthTokenGuard } from '../auth/guards/auth.token.guard';
import { TokenPayloadParam } from '../auth/params/token-payload.param';
import { TokenPayloadDto } from '../auth/dto/token-payload.dto';

@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) {}

    @Post()
    // @Roles(Role.Student)
    create(@Body() createStudentDto: CreateStudentDto) {
        return this.studentsService.create(createStudentDto);
    }

    @Get()
    findAll() {
        return this.studentsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.studentsService.findOne(+id);
    }

    @UseGuards(AuthTokenGuard)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateStudentDto: UpdateStudentDto,
        @TokenPayloadParam() tokenPayload: TokenPayloadDto,
    ) {
        return this.studentsService.update(+id, updateStudentDto, tokenPayload);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @TokenPayloadParam() tokenPayload: TokenPayloadDto) {
        return this.studentsService.remove(+id, tokenPayload);
    }
}
