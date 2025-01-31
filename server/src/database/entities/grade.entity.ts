import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Enrollment } from 'src/database/entities/enrollment.entity';

@Entity('grades')
export class Grade {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'float' })
    grade: number;

    @Column({ type: 'date' })
    assessment_date: Date;

    @ManyToOne(() => Enrollment)
    @JoinColumn({ name: 'enrollment_id' })
    enrollment_id: number;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @DeleteDateColumn()
    deleted_at?: Date;
}
