import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './subscription.entity';
import { SubscriptionPrivateController } from './subscription.private.controller';
import { SubscriptionPublicController } from './subscription.public.controller';
import { SubscriptionService } from './subscription.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription]), HttpModule],
  exports: [SubscriptionService],
  providers: [SubscriptionService],
  controllers: [SubscriptionPublicController, SubscriptionPrivateController],
})
export class SubscriptionModule {}
