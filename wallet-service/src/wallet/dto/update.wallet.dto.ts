import { IsString, IsNumber } from 'class-validator';

export class UpdateWalletDto {
  @IsString()
  userId: string;

  @IsNumber()
  amount: number;
}
