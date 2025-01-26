import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { HashingService } from './hashing/hashing.service';
import { Injectable, UnauthorizedException, Inject, NotFoundException } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly hashingService: HashingService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        private readonly jwtService: JwtService,
    ) {}

    private async getAccessToken(user: User) {
        const accessToken = this.jwtService.sign(
            { sub: user.id, email: user.email, role: user.role },
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
        const user = await this.userRepository.findOneBy({ email: loginDto.email });

        if (!user) {
            throw new NotFoundException('Wrong credentials.');
        }

        const isPasswordValid = await this.hashingService.compare(loginDto.password, user.password_hash);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Wrong credentials.');
        }

        const getAccessToken = await this.getAccessToken(user);
        return getAccessToken;
    }
}
