import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grade } from '../database/entities/grade.entity';
import { GradesService } from '../services/grades.service';
import { GradesController } from '../controllers/grades.controller';
import { Enrollment } from 'src/database/entities/enrollment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Grade, Enrollment])],
    controllers: [GradesController],
    providers: [GradesService],
})
export class GradesModule {}
