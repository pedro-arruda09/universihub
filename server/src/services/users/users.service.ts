import * as path from 'path';
import * as fs from 'fs/promises';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { HashingService } from 'src/auth/hashing/hashing.service';
import { CreateUserDto } from 'src/common/dtos/users/create-user.dto';
import { UpdateUserDto } from 'src/common/dtos/users/update-user.dto';
import { HandleErrorUtils } from 'src/common/utils/handle-error.utils';
import { ForbiddenException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';

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

    async uploadPicture(file: Express.Multer.File, tokenPayload: TokenPayloadDto) {
        try {
            const user = await this.userRepository.findOneBy({ id: tokenPayload.sub });

            if (file.size < 1024) {
                throw new BadRequestException('File size must be greater than 1KB.');
            }

            const fileExtension = path.extname(file.originalname).toLowerCase().substring(1);
            const fileName = `${tokenPayload.sub}.${fileExtension}`;
            const fileFullPath = path.resolve(process.cwd(), 'pictures', fileName);

            await fs.writeFile(fileFullPath, file.buffer);

            user.img_url = fileName;
            await this.userRepository.save(user);

            return user;
        } catch (error) {
            return this.handleErrorUtils.getErrorMessage(error);
        }
    }
}
