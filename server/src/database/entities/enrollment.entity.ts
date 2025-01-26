import {
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Grade } from 'src/database/entities/grade.entity';
import { Classroom } from 'src/database/entities/classroom.entity';

@Entity('enrollments')
export class Enrollment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Classroom)
    @JoinColumn({ name: 'classroom_id' })
    classroom_id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user_id: number;

    @OneToMany(() => Grade, grade => grade.enrollment_id)
    grades: Grade[];

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @DeleteDateColumn()
    deleted_at?: Date;
}
