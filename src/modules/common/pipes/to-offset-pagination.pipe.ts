import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ToOffsetPaginationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value) {
      const offset = Number(value);
      if (!isNaN(offset)) {
        if (offset >= 0) {
          return offset;
        }
        throw new BadRequestException(`${metadata.data} must be >= 0`);
      }
      throw new BadRequestException(`${metadata.data} must be a Int`);
    }
  }
}
