import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { CreateWalletDto } from './dto';
import { WalletService } from './wallet.service';
import { EventPattern } from '@nestjs/microservices';
import { CacheInterceptor } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  async findAll() {
    return this.walletService.findAll();
  }

  @Post()
  async create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.create(createWalletDto);
  }

  @EventPattern('user_created')
  async handleUserCreated(data: { userId: string }) {
    const userId = data.userId;
    const walletExists = await this.walletService.findOne(userId);

    if (!walletExists) {
      await this.walletService.create({
        userId: userId,
        amount: 0,
      });
    }
  }

  @EventPattern('update_amount')
  async updateWalletForUserService(data: { userId: string; amount: number }) {
    const userId = data.userId;
    const amount = data.amount;
    await this.walletService.updateWithUserId(userId, amount);
  }

  @EventPattern('get_user_wallet_amount')
  async findWalletAmountWithUseId(data: { userId: string }) {
    const userId = data.userId;
    const seletion = 'amount';
    const wallet = await this.walletService.findWalletAmountWithUseId(
      userId,
      seletion,
    );
    return wallet;
  }
}
