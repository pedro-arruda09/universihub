import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Major } from '../database/entities/major.entity';
import { MajorsService } from '../services/majors.service';
import { MajorsController } from 'src/controllers/majors.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Major])],
    controllers: [MajorsController],
    providers: [MajorsService],
    exports: [MajorsService],
})
export class MajorsModule {}
