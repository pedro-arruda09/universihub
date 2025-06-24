import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Matches } from 'class-validator';
import { ClassroomSchedule } from './classroom-schedule.entity';

@Entity('schedules')
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    day_of_week: number;

    @Column()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'start_time must be in HH:mm format' })
    start_time: string;

    @Column()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'end_time must be in HH:mm format' })
    end_time: string;

    @OneToMany(() => ClassroomSchedule, classroomSchedule => classroomSchedule.schedule_id)
    classroom_schedules: ClassroomSchedule[];

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @DeleteDateColumn()
    deleted_at?: Date;
}
