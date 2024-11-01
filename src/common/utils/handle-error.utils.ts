import { errorCodes } from './error-code.utils';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class HandleErrorUtils {
    public getErrorMessage(error: any): string {
        const errorCodeMap = {
            '23505': {
                exception: new ConflictException({
                    message: errorCodes.UNIQUE_CONSTRAINT_VIOLATION,
                    statusCode: 409,
                }),
            },
            '23503': {
                exception: new NotFoundException({
                    message: errorCodes.FOREIGN_KEY_CONSTRAINT_VIOLATION,
                    statusCode: 404,
                }),
            },
            '23502': {
                exception: new BadRequestException({
                    message: errorCodes.NOT_NULL_CONSTRAINT_VIOLATION,
                    statusCode: 400,
                }),
            },
            '23514': {
                exception: new BadRequestException({
                    message: errorCodes.CHECK_CONSTRAINT_VIOLATION,
                    statusCode: 400,
                }),
            },
            '23P01': {
                exception: new ConflictException({
                    message: errorCodes.EXCLUSION_CONSTRAINT_VIOLATION,
                    statusCode: 409,
                }),
            },
            '42601': {
                exception: new BadRequestException({
                    message: errorCodes.SYNTAX_ERROR,
                    statusCode: 400,
                }),
            },
            '22P02': {
                exception: new BadRequestException({
                    message: errorCodes.INVALID_TEXT_REPRESENTATION,
                    statusCode: 400,
                }),
            },
        };

        let errorException = errorCodeMap[error?.code]?.exception || new Error();

        if (error instanceof NotFoundException) {
            errorException = new NotFoundException({
                message: error.message,
                statusCode: 404,
            });
        }

        throw errorException;
    }
}
