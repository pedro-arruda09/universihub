import { IsEmail } from 'class-validator';
import { Role } from 'src/domain/enum/roles.enum';
import { Course } from 'src/infrastructure/entities/course.entity';
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

@Entity('students')
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    @IsEmail()
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password_hash: string;

    @Column({ type: 'varchar', length: 255 })
    birth_date: string;

    @Column({ type: 'varchar', length: 255 })
    address?: string;

    @ManyToOne(() => Course)
    @JoinColumn({ name: 'course_id' })
    course_id: number;

    @Column({ type: 'varchar', length: 255, default: 'Student' })
    role: Role;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @DeleteDateColumn()
    deleted_at?: Date;
}
