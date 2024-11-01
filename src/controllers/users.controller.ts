import { UsersService } from 'src/services/users/users.service';
import { TokenPayloadDto } from '../auth/dto/token-payload.dto';
import { AuthTokenGuard } from '../auth/guards/auth.token.guard';
import { CreateUserDto } from '../common/dtos/users/create-user.dto';
import { UpdateUserDto } from '../common/dtos/users/update-user.dto';
import { TokenPayloadParam } from '../auth/params/token-payload.param';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @UseGuards(AuthTokenGuard)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
        @TokenPayloadParam() tokenPayload: TokenPayloadDto,
    ) {
        return this.usersService.update(+id, updateUserDto, tokenPayload);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @TokenPayloadParam() tokenPayload: TokenPayloadDto) {
        return this.usersService.remove(+id, tokenPayload);
    }
}
