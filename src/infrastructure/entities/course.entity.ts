import { Subject } from './subject.entity';
import { Professor } from './professor.entity';
import { Student } from './student.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('courses')
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @OneToMany(() => Student, student => student.course_id)
    students: Student[];

    @OneToMany(() => Professor, professor => professor.course_id)
    professors: Professor[];

    @OneToMany(() => Subject, subject => subject.course_id)
    subjects: Subject[];

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @DeleteDateColumn()
    deleted_at?: Date;
}
