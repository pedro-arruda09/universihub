import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { HashingService } from 'src/auth/hashing/hashing.service';
import { CreateUserDto } from 'src/common/dtos/users/create-user.dto';
import { UpdateUserDto } from 'src/common/dtos/users/update-user.dto';
import { HandleErrorUtils } from 'src/common/utils/handle-error.utils';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly hashingService: HashingService,
        private readonly handleErrorUtils: HandleErrorUtils,
    ) {}

    async create(createUserDto: CreateUserDto) {
        try {
            const passwordHash = await this.hashingService.hash(createUserDto.password);
            delete createUserDto.password;
            const userData = {
                ...createUserDto,
                password_hash: passwordHash,
            };

            const user = this.userRepository.create(userData);
            await this.userRepository.save(user);
            return user;
        } catch (error) {
            return this.handleErrorUtils.getErrorMessage(error);
        }
    }

    async findAll() {
        try {
            const users = await this.userRepository.find({
                withDeleted: false,
            });

            if (!users.length) {
                throw new NotFoundException('Users not found.');
            }

            return users;
        } catch (error) {
            return this.handleErrorUtils.getErrorMessage(error);
        }
    }

    async findOne(id: number) {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    id,
                    deleted_at: null,
                },
            });

            if (!user) {
                throw new NotFoundException('User not found.');
            }

            return user;
        } catch (error) {
            return this.handleErrorUtils.getErrorMessage(error);
        }
    }

    async update(id: number, updateUserDto: UpdateUserDto, tokenPayload: TokenPayloadDto) {
        try {
            const userData = {
                name: updateUserDto?.name,
            };

            if (updateUserDto?.password) {
                const passwordHash = await this.hashingService.hash(updateUserDto.password);

                userData['password_hash'] = passwordHash;
            }

            const user = await this.userRepository.preload({
                id,
                ...userData,
            });

            if (!user) {
                throw new NotFoundException('User not found.');
            }

            if (user.id !== tokenPayload.sub) {
                throw new ForbiddenException(`You're not allowed to update this user.`);
            }

            return this.userRepository.save(user);
        } catch (error) {
            return this.handleErrorUtils.getErrorMessage(error);
        }
    }

    async remove(id: number, tokenPayload: TokenPayloadDto) {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    id,
                    deleted_at: null,
                },
            });

            if (!user) {
                throw new NotFoundException('User not found.');
            }

            if (user.id !== tokenPayload.sub) {
                throw new ForbiddenException(`You're not allowed to remove this user.`);
            }

            await this.userRepository.softDelete(id);

            return user;
        } catch (error) {
            return this.handleErrorUtils.getErrorMessage(error);
        }
    }
}