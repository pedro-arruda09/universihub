import { IsNumber } from 'class-validator';
import { Enrollment } from 'src/infrastructure/entities/enrollment.entity';
import { Professor } from 'src/infrastructure/entities/professor.entity';
import { Subject } from 'src/infrastructure/entities/subject.entity';
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

@Entity('classrooms')
export class Classroom {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column()
    @IsNumber()
    year: number;

    @Column()
    @IsNumber()
    semester: number;

    @ManyToOne(() => Subject)
    @JoinColumn({ name: 'subject_id' })
    subject_id: number;

    @ManyToOne(() => Professor)
    @JoinColumn({ name: 'professor_id' })
    professor_id: number;

    @OneToMany(() => Enrollment, enrollment => enrollment.classroom_id)
    enrollment: Enrollment[];

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;
}
