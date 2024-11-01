import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../services/users/users.service';
import { User } from 'src/database/entities/user.entity';
import { UsersController } from 'src/controllers/users.controller';
import { HandleErrorUtils } from 'src/common/utils/handle-error.utils';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService, HandleErrorUtils],
    exports: [UsersService],
})
export class UsersModule {}
