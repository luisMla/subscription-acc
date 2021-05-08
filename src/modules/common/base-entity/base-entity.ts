import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn('uuid')
  @IsString({ groups: ['CRUD-UPDATE'] })
  @IsOptional({ groups: ['CRUD-CREATE'] })
  id?: number;

  @ApiProperty({ type: Date, example: 'YYYY-MM-DDTHH:MM:SS.mmmZ' })
  @CreateDateColumn()
  @IsOptional({ always: true })
  @Exclude()
  createdAt?: Date;

  @ApiProperty({ type: Date, example: 'YYYY-MM-DDTHH:MM:SS.mmmZ' })
  @UpdateDateColumn()
  @IsOptional({ always: true })
  @Exclude()
  updatedAt?: Date;
}
