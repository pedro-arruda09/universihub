import { Module } from '@nestjs/common';
import { SubjectsController } from 'src/application/controllers/subjects.controller';
import { SubjectsService } from '../services/subjects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from 'src/infrastructure/entities/subject.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Subject])],
    controllers: [SubjectsController],
    providers: [SubjectsService],
})
export class SubjectsModule {}
