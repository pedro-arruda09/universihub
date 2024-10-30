import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProfessorsService } from 'src/domain/services/professors.service';
import { CreateProfessorDto } from '../dtos/professors/create-professor.dto';
import { UpdateProfessorDto } from '../dtos/professors/update-professor.dto';
import { AuthTokenGuard } from '../auth/guards/auth.token.guard';
import { TokenPayloadParam } from '../auth/params/token-payload.param';
import { TokenPayloadDto } from '../auth/dto/token-payload.dto';

@Controller('professors')
export class ProfessorsController {
    constructor(private readonly professorsService: ProfessorsService) {}

    @Post()
    // @Roles(Role.Professor)
    create(@Body() createStudentDto: CreateProfessorDto) {
        return this.professorsService.create(createStudentDto);
    }

    @Get()
    findAll() {
        return this.professorsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.professorsService.findOne(+id);
    }

    @UseGuards(AuthTokenGuard)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateStudentDto: UpdateProfessorDto,
        @TokenPayloadParam() tokenPayload: TokenPayloadDto,
    ) {
        return this.professorsService.update(+id, updateStudentDto, tokenPayload);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @TokenPayloadParam() tokenPayload: TokenPayloadDto) {
        return this.professorsService.remove(+id, tokenPayload);
    }
}
