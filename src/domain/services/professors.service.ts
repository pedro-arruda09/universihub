import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenPayloadDto } from 'src/application/auth/dto/token-payload.dto';
import { HashingService } from 'src/application/auth/hashing/hashing.service';
import { CreateProfessorDto } from 'src/application/dtos/professors/create-professor.dto';
import { UpdateProfessorDto } from 'src/application/dtos/professors/update-professor.dto';
import { Professor } from 'src/infrastructure/entities/professor.entity';
import { Repository } from 'typeorm';
import { ValidateEmailUtils } from '../utils/validate-email.utils';
import { CoursesService } from './courses.service';

@Injectable()
export class ProfessorsService {
    constructor(
        @InjectRepository(Professor)
        private readonly professorRepository: Repository<Professor>,
        private readonly hashingService: HashingService,
        private readonly validateEmailUtils: ValidateEmailUtils,
        private readonly courseService: CoursesService,
    ) {}

    async create(createProfessorDto: CreateProfessorDto) {
        try {
            const emailExists = await this.validateEmailUtils.validateEmail(createProfessorDto.email);

            if (emailExists) {
                throw new Error('Email already exists.');
            }

            const courseId = createProfessorDto.course_id;
            const course = await this.courseService.findOne(courseId);

            if (!course) {
                throw new Error('Course not found.');
            }

            const passwordHash = await this.hashingService.hash(createProfessorDto.password);

            delete createProfessorDto.password;

            const professorData = {
                ...createProfessorDto,
                password_hash: passwordHash,
            };

            const professor = this.professorRepository.create(professorData);
            await this.professorRepository.save(professor);
            return professor;
        } catch (error) {
            console.log(error, 'error');
            throw new Error('Could not create professor');
        }
    }

    async findAll() {
        try {
            const professors = await this.professorRepository.find({
                withDeleted: false,
            });

            if (!professors) {
                throw new Error('Professors not found');
            }

            return professors;
        } catch (error) {
            throw new Error('Could not fetch professors');
        }
    }

    async findOne(id: number) {
        try {
            const professor = await this.professorRepository.findOne({
                where: {
                    id,
                    deleted_at: null,
                },
            });

            if (!professor) {
                throw new Error('Professor not found');
            }

            return professor;
        } catch (error) {
            throw new Error('Could not fetch professor.');
        }
    }

    async update(id: number, updateProfessorDto: UpdateProfessorDto, tokenPayload: TokenPayloadDto) {
        try {
            const professor = await this.professorRepository.preload({
                id,
                ...updateProfessorDto,
            });

            if (!professor) {
                throw new Error('Professor not found.');
            }

            if (professor.id !== tokenPayload.sub) {
                throw new Error('Unauthorized permission.');
            }

            return this.professorRepository.save(professor);
        } catch (error) {
            throw new Error('Could not update professor.');
        }
    }

    async remove(id: number, tokenPayload: TokenPayloadDto) {
        try {
            const professor = await this.professorRepository.findOne({
                where: {
                    id,
                    deleted_at: null,
                },
            });

            if (!professor) {
                throw new Error('Professor not found.');
            }

            if (professor.id !== tokenPayload.sub) {
                throw new Error('Unauthorized permission.');
            }

            return this.professorRepository.softDelete(id);
        } catch (error) {
            throw new Error('Could not remove professor.');
        }
    }
}
