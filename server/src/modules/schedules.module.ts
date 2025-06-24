import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from 'src/database/entities/schedule.entity';
import { SchedulesService } from 'src/services/schedules.service';
import { SchedulesController } from 'src/controllers/schedules.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Schedule])],
    controllers: [SchedulesController],
    providers: [SchedulesService],
})
export class SchedulesModule {}
