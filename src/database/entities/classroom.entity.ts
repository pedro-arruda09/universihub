import { IsNumber } from 'class-validator';
import { User } from 'src/database/entities/user.entity';
import { Subject } from 'src/database/entities/subject.entity';
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

    @ManyToOne(() => Subject)
    @JoinColumn({ name: 'subject_id' })
    subject_id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user_id: number;

    @OneToMany(() => Enrollment, enrollment => enrollment.classroom_id)
    enrollment: Enrollment[];

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @DeleteDateColumn()
    deleted_at?: Date;
}
