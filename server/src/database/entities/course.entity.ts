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
import { IsNumber } from 'class-validator';
import { Major } from 'src/database/entities/major.entity';
import { Classroom } from 'src/database/entities/classroom.entity';

@Entity('courses')
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column()
    @IsNumber()
    credits: number;

    @ManyToOne(() => Major)
    @JoinColumn({ name: 'major_id' })
    major_id: number;

    @OneToMany(() => Classroom, classroom => classroom.course_id)
    classrooms: Classroom[];

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @DeleteDateColumn()
    deleted_at?: Date;
}
