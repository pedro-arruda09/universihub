import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { Role } from 'src/common/enum/roles.enum';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/database/entities/user.entity';
import { HashingService } from 'src/auth/hashing/hashing.service';
import { CreateUserDto } from 'src/common/dtos/users/create-user.dto';
import { HandleErrorUtils } from 'src/common/utils/handle-error.utils';

describe('UsersService', () => {
    let usersService: UsersService;
    let userRepository: Repository<User>;
    let hashingService: HashingService;
    let handleErrorUtils: HandleErrorUtils;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useValue: {
                        save: jest.fn(),
                        create: jest.fn(),
                        findOne: jest.fn(),
                        find: jest.fn(),
                        preload: jest.fn(),
                    },
                },
                {
                    provide: HashingService,
                    useValue: {
                        hash: jest.fn(),
                    },
                },
                {
                    provide: HandleErrorUtils,
                    useValue: {
                        getErrorMessage: jest.fn(),
                    },
                },
            ],
        }).compile();

        usersService = module.get<UsersService>(UsersService);
        userRepository = module.get<Repository<User>>(getRepositoryToken(User));
        hashingService = module.get<HashingService>(HashingService);
        handleErrorUtils = module.get<HandleErrorUtils>(HandleErrorUtils);
    });

    describe('Create', () => {
        it('should create an user', async () => {
            const createUserDto: CreateUserDto = {
                name: 'John Doe',
                email: 'johndoe@gmail.com',
                password: '123456',
                birth_date: '2000-01-01',
                address: '123, Main Street',
                major_id: 1,
            };
            const userPassword = createUserDto.password;
            const passwordHash = 'hashedPassword';
            const userData: User = {
                id: 1,
                name: 'John Doe',
                email: 'johndoe@gmail.com',
                birth_date: '2000-01-01',
                address: '123, Main Street',
                major_id: 1,
                role: Role.STUDENT,
                password_hash: passwordHash,
                picture: 'profile.jpg',
            };

            jest.spyOn(hashingService, 'hash').mockResolvedValue(passwordHash);
            jest.spyOn(userRepository, 'create').mockReturnValue(userData as any);
            jest.spyOn(userRepository, 'save').mockResolvedValue(userData);

            const result = await usersService.create(createUserDto);
            delete createUserDto.password;

            expect(hashingService.hash).toHaveBeenCalledWith(userPassword);
            expect(userRepository.create).toHaveBeenCalledWith({
                ...createUserDto,
                password_hash: passwordHash,
            });
            expect(userRepository.save).toHaveBeenCalledWith(userData);
            expect(result).toEqual(userData);
        });

        it('should return the correct error message when the email already exists', async () => {
            const errorMessage = 'Email already exists';

            jest.spyOn(userRepository, 'save').mockRejectedValue({
                code: '23505',
            });

            const errorResponse = jest
                .spyOn(handleErrorUtils, 'getErrorMessage')
                .mockImplementation(error => {
                    if (error.code === '23505') {
                        return errorMessage;
                    }
                    return 'Unknown error';
                });

            const result = await usersService.create({} as any);

            expect(result).toEqual(errorMessage);
            expect(errorResponse).toHaveBeenCalledWith({
                code: '23505',
            });
        });

        it('should throw an error', async () => {
            const errorMessage = 'Unexpected error';

            jest.spyOn(userRepository, 'save').mockRejectedValue(new Error(errorMessage));
            jest.spyOn(handleErrorUtils, 'getErrorMessage').mockImplementation(() => {
                return errorMessage;
            });

            const result = await usersService.create({} as any);
            expect(result).toEqual(errorMessage);
        });
    });

    describe('FindAll', () => {
        it('should return all users', async () => {
            const mockUsers: User[] = [
                {
                    id: 1,
                    name: 'John Doe',
                    email: 'johndoe@gmail.com',
                    birth_date: '2000-01-01',
                    address: '123, Main Street',
                    major_id: 1,
                    role: Role.STUDENT,
                    password_hash: '123456',
                } as User,
            ];
            const findAllUsersPayload = { withDeleted: false };

            jest.spyOn(userRepository, 'find').mockResolvedValue(mockUsers as any);

            const result = await usersService.findAll();

            expect(userRepository.find).toHaveBeenCalledWith({
                ...findAllUsersPayload,
            });
            expect(result).toEqual(mockUsers);
        });

        it('should throw an error if no users are found', async () => {
            const errorMessage = 'Users not found';

            jest.spyOn(userRepository, 'find').mockResolvedValue([]);
            jest.spyOn(handleErrorUtils, 'getErrorMessage').mockImplementation(() => {
                return errorMessage;
            });

            const result = await usersService.findAll();

            expect(result).toEqual(errorMessage);
        });
    });

    describe('FindOne', () => {
        it('should return a user if it exists', async () => {
            const userId = 1;
            const foundUser: User = {
                id: 1,
                name: 'John Doe',
                email: 'johndoe@gmail.com',
                birth_date: '2000-01-01',
                address: '123, Main Street',
                major_id: 1,
                role: Role.STUDENT,
                password_hash: '123456',
                picture: 'profile.jpg',
            };
            const findUserPayload = { where: { deleted_at: null, id: 1 } };

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(foundUser as any);

            const result = await usersService.findOne(userId);

            expect(userRepository.findOne).toHaveBeenCalledWith({
                ...findUserPayload,
            });
            expect(result).toEqual(foundUser);
        });

        it('should throw an error if the user does not exist', async () => {
            const userId = 1;
            const errorMessage = 'User not found';

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
            jest.spyOn(handleErrorUtils, 'getErrorMessage').mockImplementation(() => {
                return errorMessage;
            });

            const result = await usersService.findOne(userId);

            expect(result).toEqual(errorMessage);
        });
    });

    describe('Update', () => {
        it('should update a user if the user is authorized', async () => {
            const userId = 1;
            const updateUserDto = { name: 'Jane Doe', password: '123456' };
            const tokenPayload = { sub: userId };
            const password_hash = 'hashedPassword';
            const updatedUser = { id: userId, name: updateUserDto.name, password_hash };

            jest.spyOn(hashingService, 'hash').mockResolvedValue(password_hash);
            jest.spyOn(userRepository, 'preload').mockResolvedValue(updatedUser as any);
            jest.spyOn(userRepository, 'save').mockResolvedValue(updatedUser as any);

            const result = await usersService.update(userId, updateUserDto, tokenPayload as any);

            expect(result).toEqual(updatedUser);
            expect(hashingService.hash).toHaveBeenCalledWith(updateUserDto.password);
            expect(userRepository.preload).toHaveBeenCalledWith({
                id: userId,
                name: updateUserDto.name,
                password_hash,
            });
            expect(userRepository.save).toHaveBeenCalledWith(updatedUser);
        });
    });
});
