import { UsersService } from 'src/services/users/users.service';
import { TokenPayloadDto } from '../auth/dto/token-payload.dto';
import { AuthTokenGuard } from '../auth/guards/auth.token.guard';
import { CreateUserDto } from '../common/dtos/users/create-user.dto';
import { UpdateUserDto } from '../common/dtos/users/update-user.dto';
import { TokenPayloadParam } from '../auth/params/token-payload.param';
import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseFilePipeBuilder,
    Patch,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
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
    @ApiBearerAuth()
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
        @TokenPayloadParam() tokenPayload: TokenPayloadDto,
    ) {
        return this.usersService.update(+id, updateUserDto, tokenPayload);
    }

    @UseGuards(AuthTokenGuard)
    @ApiBearerAuth()
    @Delete(':id')
    remove(@Param('id') id: string, @TokenPayloadParam() tokenPayload: TokenPayloadDto) {
        return this.usersService.remove(+id, tokenPayload);
    }

    @UseGuards(AuthTokenGuard)
    @ApiBearerAuth()
    @UseInterceptors(FileInterceptor('file'))
    @Post('upload-pictures')
    async uploadPicture(
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({ fileType: /jpeg|jpg|png/g })
                .addMaxSizeValidator({ maxSize: 10 * (1024 * 1024) })
                .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
        )
        file: Express.Multer.File,
        @TokenPayloadParam() tokenPayload: TokenPayloadDto,
    ) {
        return this.usersService.uploadPicture(file, tokenPayload);
    }
}
