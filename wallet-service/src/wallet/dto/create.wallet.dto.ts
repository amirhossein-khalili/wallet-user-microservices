import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateWalletDto {
  @IsString()
  userId: string;

  @IsOptional()
  @IsNumber()
  amount?: number;
}
