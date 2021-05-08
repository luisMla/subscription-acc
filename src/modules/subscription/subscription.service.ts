import {
  HttpService,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { default as customErrorLogger } from '../../utils/error-handler';
import { Pagination } from '../common/pagination/pagination.class';
import {
  Subscription,
  SubscriptionFillableFields,
} from './subscription.entity';

const errorLogger = customErrorLogger('SubscriptionService');
@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    private readonly http: HttpService,
  ) {}

  async createSubscription(payload: SubscriptionFillableFields) {
    await this.subscriptionRepository
      .save(this.subscriptionRepository.create(payload))
      .catch((err) => {
        errorLogger(err, true);
        return new InternalServerErrorException();
      });
    return;
  }

  async revokeSubscription(id: string) {
    await this.subscriptionRepository
      .update(id, { isActive: false })
      .catch((err) => {
        errorLogger(err, true);
        return new InternalServerErrorException();
      });
    return;
  }

  async getById(id: string) {
    const subscription = await this.subscriptionRepository
      .findOne({
        where: { id },
      })
      .catch((err) => {
        errorLogger(err, true);
        return new InternalServerErrorException();
      });
    if (!subscription) {
      throw new NotFoundException();
    }
    return subscription;
  }

  async getAll(limit: number, offset: number) {
    let findManyOptions: FindManyOptions = {
      take: limit,
      skip: offset,
    };

    const result = await this.subscriptionRepository
      .findAndCount(findManyOptions)
      .catch((err) => {
        errorLogger(err, true);
        return new InternalServerErrorException();
      });
    return new Pagination<Subscription>(result[0], result[1]);
  }

  async sendNewsLetter(id: string) {
    const newsLetter = await this.subscriptionRepository.findOne({
      where: { campaignId: id },
    });
    if (!newsLetter) {
      throw new NotFoundException();
    }
    const headersRequest = {
      'Content-Type': 'application/json',
      'x-api-key': '123456',
    };

    const { data } = await this.http
      .post(
        `http://mails:3001/api/mail/send-emails/${id}`,
        { id },
        { headers: headersRequest },
      )
      .toPromise()
      .catch((err) => {
        const { response } = err;

        errorLogger(err);
        return response;
      });

    return data;
  }
}
