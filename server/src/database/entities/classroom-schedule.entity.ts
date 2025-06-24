import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Classroom } from './classroom.entity';
import { Schedule } from './schedule.entity';

@Entity('classroom_schedules')
export class ClassroomSchedule {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Classroom)
    @JoinColumn({ name: 'classroom_id' })
    classroom_id: number;

    @ManyToOne(() => Schedule)
    @JoinColumn({ name: 'schedule_id' })
    schedule_id: number;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;
}
