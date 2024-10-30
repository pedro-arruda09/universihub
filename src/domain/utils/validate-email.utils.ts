import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Professor } from 'src/infrastructure/entities/professor.entity';
import { Student } from 'src/infrastructure/entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ValidateEmailUtils {
    constructor(
        @InjectRepository(Student) private readonly studentRepository: Repository<Student>,
        @InjectRepository(Professor) private readonly professorRepository: Repository<Professor>,
    ) {}

    async validateEmail(email: string) {
        try {
            const student = await this.studentRepository.findOneBy({ email });
            const professor = await this.professorRepository.findOneBy({ email });

            if (student || professor) {
                return true;
            }

            return false;
        } catch (error) {
            throw new Error('Could not validate email.');
        }
    }
}
