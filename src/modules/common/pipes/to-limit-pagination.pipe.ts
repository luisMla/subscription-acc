import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ToLimitPaginationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value) {
      const limit = Number(value);
      if (!isNaN(limit)) {
        if (limit > 0 && limit < 1000) {
          return limit;
        }
        throw new BadRequestException(`${metadata.data} must be > 0 && < 1000`);
      }
      throw new BadRequestException(`${metadata.data} must be a Int`);
    }
  }
}
