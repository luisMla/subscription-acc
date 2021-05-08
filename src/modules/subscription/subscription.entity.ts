import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../common/base-entity/base-entity';

@Entity({
  name: 'subscription',
})
export class Subscription extends BaseEntity {
  @ApiProperty({ type: String })
  @Column({ type: String })
  email: string;

  @ApiPropertyOptional({ type: String })
  @Column({ type: String, nullable: true, default: null })
  firstName?: string;

  @ApiPropertyOptional({ type: String })
  @Column({ type: String, nullable: true, default: null })
  gender?: string;

  @ApiProperty({ type: Date, example: 'YYYY-MM-DDTHH:MM:SS.mmmZ' })
  @Column({ type: Date })
  dateOfBirth: Date;

  @ApiPropertyOptional({ type: Boolean })
  @Column({ type: Boolean })
  consent: boolean;

  @ApiPropertyOptional({ type: Boolean })
  @Column({ type: Boolean, default: true, nullable: true })
  isActive: boolean;

  @ApiPropertyOptional({ type: String })
  @Column({ type: String })
  campaignId: string;

  toJSON() {
    const { createdAt, updatedAt, ...self } = this;
    return self;
  }
}

export class SubscriptionFillableFields {
  email: string;
  dateOfBirth: string;
  consent: boolean;
  campaignId: string;
  firstName?: string;
  gender?: string;
}
