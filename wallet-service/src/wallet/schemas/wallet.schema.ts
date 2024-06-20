import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Wallet extends Document {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ default: false })
  softDelete: boolean;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
