import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../auth/decorators/role.decorator';
import { RolesGuard } from '../auth/roles-guard';
import { XApiKeyGuard } from '../auth/x-api-key-guard';
import { ROL } from '../common/enums/role.enum';
import { ToLimitPaginationPipe } from '../common/pipes/to-limit-pagination.pipe';
import { ToOffsetPaginationPipe } from '../common/pipes/to-offset-pagination.pipe';
import { SubscriptionService } from './subscription.service';

@ApiHeader({
  name: 'x-api-key',
  description: 'Custom header',
})
@Controller('api/subscription-private')
@ApiTags('subscription-private')
export class SubscriptionPrivateController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  @ApiBearerAuth()
  @Roles([ROL.USER, ROL.ADMIN])
  @UseGuards(AuthGuard('jwt'), RolesGuard, XApiKeyGuard)
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiOperation({
    description: 'Return pagination of Subscriptions for all newsletter',
  })
  async getAll(
    @Query('limit', new ToLimitPaginationPipe()) limit: number,
    @Query('offset', new ToOffsetPaginationPipe()) offset: number,
  ): Promise<any> {
    return await this.subscriptionService.getAll(limit, offset);
  }

  @Get(':id')
  @ApiBearerAuth()
  @Roles([ROL.USER, ROL.ADMIN])
  @UseGuards(AuthGuard('jwt'), RolesGuard, XApiKeyGuard)
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiOperation({
    description: 'Return detail Subscription for a newsletter',
  })
  async getById(@Param('id') id: string): Promise<any> {
    return await this.subscriptionService.getById(id);
  }

  @Post('/send-emails/:newsLetterId')
  @UseGuards(XApiKeyGuard)
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiOperation({
    description: 'Return detail Subscription for a newsletter',
  })
  async sendNewsLetter(
    @Param('newsLetterId') newsLetterId: string,
  ): Promise<any> {
    return await this.subscriptionService.sendNewsLetter(newsLetterId);
  }
}
