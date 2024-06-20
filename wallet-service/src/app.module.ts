import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletController } from './wallet/wallet.controller';
import { WalletService } from './wallet/wallet.service';

@Module({
  imports: [],
  controllers: [AppController, WalletController],
  providers: [AppService, WalletService],
})
export class AppModule {}
