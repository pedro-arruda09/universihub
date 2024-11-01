import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { BcryptService } from './hashing/bcrypt.service';
import { User } from 'src/database/entities/user.entity';
import { HashingService } from './hashing/hashing.service';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
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
