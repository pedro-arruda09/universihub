import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classroom } from 'src/database/entities/classroom.entity';
import { ClassroomsService } from 'src/services/classrooms.service';
import { ClassroomsController } from 'src/controllers/classrooms.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Classroom])],
    controllers: [ClassroomsController],
    providers: [ClassroomsService],
})
export class ClassroomsModule {}
