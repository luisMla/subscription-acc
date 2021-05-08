import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { AuthModule } from 'modules/auth';
import { CommonModule } from 'modules/common';
import { ConfigModule, ConfigService } from 'modules/config';
import { SubscriptionModule } from '../subscription/subscription.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get('DB_TYPE'),
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [__dirname + './../**/**.entity{.ts,.js}'],
          charset: configService.get('DB_CHARSET'),
          synchronize: configService.get('DB_SYNC') === 'true',
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    ConfigModule,
    AuthModule,
    CommonModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
