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
import { Major } from 'src/database/entities/major.entity';

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

    @ManyToOne(() => Major)
    @JoinColumn({ name: 'major_id' })
    major_id: number;

    @Column({ type: 'varchar', length: 255 })
    @IsEnum(Role)
    role: Role;

    @Column({ nullable: true })
    img_url: string;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @DeleteDateColumn()
    deleted_at?: Date;
}
