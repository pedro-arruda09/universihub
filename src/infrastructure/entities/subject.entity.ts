import { IsNumber } from 'class-validator';
import { Classroom } from 'src/infrastructure/entities/classroom.entity';
import { Course } from 'src/infrastructure/entities/course.entity';
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

@Entity('subjects')
export class Subject {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column()
    @IsNumber()
    credits: number;

    @ManyToOne(() => Course)
    @JoinColumn({ name: 'course_id' })
    course_id: number;

    @OneToMany(() => Classroom, classroom => classroom.subject_id)
    classrooms: Classroom[];

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @DeleteDateColumn()
    deleted_at?: Date;
}