import { IsEmail } from 'class-validator';
import { Role } from 'src/domain/enum/roles.enum';
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

@Entity('professors')
export class Professor {
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

    @ManyToOne(() => Course)
    @JoinColumn({ name: 'course_id' })
    course_id: number;

    @OneToMany(() => Classroom, classroom => classroom.professor_id)
    classrooms: Classroom[];

    @Column({ type: 'varchar', length: 255, default: 'Professor' })
    role?: Role;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @DeleteDateColumn()
    deleted_at?: Date;
}
