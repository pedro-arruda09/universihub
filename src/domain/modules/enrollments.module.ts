import { Module } from '@nestjs/common';
import { EnrollmentsController } from 'src/application/controllers/enrollments.controller';
import { EnrollmentsService } from '../services/enrollments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from 'src/infrastructure/entities/enrollment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Enrollment])],
    controllers: [EnrollmentsController],
    providers: [EnrollmentsService],
})
export class EnrollmentsModule {}
