import { Global, Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/infrastructure/entities/student.entity';
import { Professor } from 'src/infrastructure/entities/professor.entity';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([Student, Professor]),
        ConfigModule.forFeature(jwtConfig),
        JwtModule.registerAsync(jwtConfig.asProvider()),
    ],
    controllers: [AuthController],
    providers: [
        {
            provide: HashingService,
            useClass: BcryptService,
        },
        AuthService,
    ],
    exports: [HashingService, JwtModule, ConfigModule],
})
export class AuthModule {}
