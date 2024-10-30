import { Module } from '@nestjs/common';
import { GradesController } from '../../application/controllers/grades.controller';
import { GradesService } from '../services/grades.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grade } from '../../infrastructure/entities/grade.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Grade])],
    controllers: [GradesController],
    providers: [GradesService],
})
export class GradesModule {}
