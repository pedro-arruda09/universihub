import { Classroom } from 'src/infrastructure/entities/classroom.entity';
import { Grade } from 'src/infrastructure/entities/grade.entity';
import { Student } from './student.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('enrollments')
export class Enrollment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @ManyToOne(() => Classroom)
    @JoinColumn({ name: 'classroom_id' })
    classroom_id: number;

    @ManyToOne(() => Student)
    @JoinColumn({ name: 'student_id' })
    student_id: number;

    @OneToMany(() => Grade, grade => grade.enrollment_id)
    grades: Grade[];

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;
}
