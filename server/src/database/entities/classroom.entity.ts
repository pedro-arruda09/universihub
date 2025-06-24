import { IsNumber, IsString } from 'class-validator';
import { User } from 'src/database/entities/user.entity';
import { Enrollment } from 'src/database/entities/enrollment.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Course } from './course.entity';
import { ClassroomSchedule } from './classroom-schedule.entity';

@Entity('classrooms')
export class Classroom {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNumber()
    year: number;

    @Column()
    @IsNumber()
    semester: number;

    @ManyToOne(() => Course)
    @JoinColumn({ name: 'course_id' })
    course_id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user_id: number;

    @OneToMany(() => Enrollment, enrollment => enrollment.classroom_id)
    enrollment: Enrollment[];

    @Column()
    room_code: string;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @DeleteDateColumn()
    deleted_at?: Date;

    @OneToMany(() => ClassroomSchedule, schedule => schedule.classroom_id)
    classroom_schedules: ClassroomSchedule[];
}
