import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentsService } from '../services/enrollments.service';
import { Enrollment } from 'src/database/entities/enrollment.entity';
import { EnrollmentsController } from 'src/controllers/enrollments.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Enrollment])],
    controllers: [EnrollmentsController],
    providers: [EnrollmentsService],
})
export class EnrollmentsModule {}
