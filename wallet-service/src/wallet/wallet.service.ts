import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CreateWalletDto, UpdateWalletDto } from './dto';
import { Wallet, WalletDocument } from './schemas/wallet.schema';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
    // @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createWalletDto: CreateWalletDto): Promise<Wallet> {
    const createdWallet = new this.walletModel(createWalletDto);
    await this.cacheManager.set(
      String(createdWallet.userId),
      createdWallet.amount,
    );

    return createdWallet.save();
  }

  async update(id: string, updateWalletDto: UpdateWalletDto): Promise<Wallet> {
    const existingWallet = await this.walletModel.findByIdAndUpdate(
      id,
      updateWalletDto,
      { new: true },
    );

    await this.cacheManager.set(
      String(existingWallet.userId),
      existingWallet.amount,
    );

    return existingWallet;
  }

  async findAll(seletion?: string) {
    return this.walletModel.find().select(seletion).exec();
  }

  async findOne(id: string, seletion?: string) {
    return this.walletModel.findById(id).select(seletion).exec();
  }

  async findWithUseId(userId: string, seletion?: string) {
    return this.walletModel.findOne({ userId: userId }).select(seletion).exec();
  }

  async findWalletAmountWithUseId(userId: string, seletion?: string) {
    const amount = await this.cacheManager.get(String(userId));

    if (!amount) {
      const wallet = await this.walletModel
        .findOne({ userId: userId })
        .select(seletion)
        .exec();
      await this.cacheManager.set(String(userId), wallet.amount);

      return wallet.amount;
    }
    return Number(amount);
  }

  async updateWithUserId(userId: string, amount: number) {
    await this.cacheManager.set(String(userId), amount);

    const res = await this.cacheManager.get(String(userId));

    console.log(res);
    return this.walletModel
      .findOneAndUpdate({ userId }, { $set: { amount } }, { new: true })
      .exec();
  }
}
