import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletModule } from './wallet/wallet.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from './common/redis/redis.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({ isGlobal: true }),
    CacheModule.registerAsync(RedisOptions),
    MongooseModule.forRoot('mongodb://localhost/nest-wallet'),
    ClientsModule.register([
      {
        name: 'WALLET_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://oshghfds:tQi23MMPiX0K7I4Y_8haBH-SazFn2vrT@jackal.rmq.cloudamqp.com/oshghfds',
          ],
          queue: 'wallet_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
    WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
