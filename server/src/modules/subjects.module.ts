import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectsService } from '../services/subjects.service';
import { Subject } from 'src/database/entities/subject.entity';
import { SubjectsController } from 'src/controllers/subjects.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Subject])],
    controllers: [SubjectsController],
    providers: [SubjectsService],
})
export class SubjectsModule {}
