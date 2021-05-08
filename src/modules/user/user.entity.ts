import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../common/base-entity/base-entity';
import { ROL } from '../common/enums/role.enum';
import { PasswordTransformer } from './password.transformer';

@Entity({
  name: 'users',
})
export class User extends BaseEntity {
  @ApiProperty({ type: String })
  @Column({ length: 255 })
  firstName: string;

  @ApiProperty({ type: String })
  @Column({ length: 255 })
  lastName: string;

  @ApiProperty({ type: String })
  @Column({ length: 255 })
  email: string;

  @ApiProperty({ enum: Object.keys(ROL) })
  @IsIn(Object.keys(ROL))
  @Column({ type: String, default: ROL.USER })
  role?: ROL;

  @Column({
    name: 'password',
    length: 255,
    transformer: new PasswordTransformer(),
  })
  password: string;

  toJSON() {
    const { password, role, createdAt, updatedAt, ...self } = this;
    return self;
  }
}

export class UserFillableFields {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
