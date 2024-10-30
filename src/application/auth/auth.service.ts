import { Injectable, UnauthorizedException, NotFoundException, Inject } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { Student } from 'src/infrastructure/entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Professor } from 'src/infrastructure/entities/professor.entity';
import { HashingService } from './hashing/hashing.service';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Student) private readonly studentRepository: Repository<Student>,
        @InjectRepository(Professor) private readonly professorRepository: Repository<Professor>,
        private readonly hashingService: HashingService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        private readonly jwtService: JwtService,
    ) {}

    private async getStudentByEmail(email: LoginDto['email']): Promise<Student> {
        const student = await this.studentRepository.findOneBy({ email });
        if (!student) throw new NotFoundException('Student not found.');
        return student;
    }

    private async getProfessorByEmail(email: LoginDto['email']): Promise<Professor> {
        const professor = await this.professorRepository.findOneBy({ email });
        if (!professor) throw new NotFoundException('Professor not found.');
        return professor;
    }

    private async getAccessToken(user: Professor | Student) {
        const accessToken = this.jwtService.sign(
            { sub: user.id, email: user.email },
            {
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                secret: this.jwtConfiguration.secret,
                expiresIn: this.jwtConfiguration.jwtTtl,
            },
        );

        return accessToken;
    }

    async login(loginDto: LoginDto) {
        let user: Professor | Student;

        if (loginDto.role === 'Student') {
            user = await this.getStudentByEmail(loginDto.email);
        }

        if (loginDto.role === 'Professor') {
            user = await this.getProfessorByEmail(loginDto.email);
        }

        const isPasswordValid = await this.hashingService.compare(loginDto.password, user.password_hash);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Wrong credentials.');
        }

        const getAccessToken = await this.getAccessToken(user);

        return getAccessToken;
    }
}
