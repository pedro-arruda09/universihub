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
import { IsEmail, IsEnum } from 'class-validator';
import { Role } from 'src/common/enum/roles.enum';
import { Course } from 'src/database/entities/course.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true })
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

    @Column({ type: 'varchar', length: 255 })
    @IsEnum(Role)
    role: Role;

    @Column({ default: '', nullable: true })
    picture: string;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @DeleteDateColumn()
    deleted_at?: Date;
}
