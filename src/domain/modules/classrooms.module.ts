import { Module } from '@nestjs/common';
import { ClassroomsController } from 'src/application/controllers/classrooms.controller';
import { ClassroomsService } from '../services/classrooms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classroom } from 'src/infrastructure/entities/classroom.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Classroom])],
    controllers: [ClassroomsController],
    providers: [ClassroomsService],
})
export class ClassroomsModule {}
