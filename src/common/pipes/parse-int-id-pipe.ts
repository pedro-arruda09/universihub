import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntIdPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (metadata.type !== 'param' || metadata.data !== 'id') {
            return value;
        }

        const parsedValue = Number(value);

        if (isNaN(parsedValue)) {
            throw new BadRequestException(
                'ParseIntPipe expects a numeric string.',
            );
        }

        if (parsedValue < 0) {
            throw new BadRequestException(
                'ParseIntPipe expects a numeric string.',
            );
        }

        return parsedValue;
    }
}
