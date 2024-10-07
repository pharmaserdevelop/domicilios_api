import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDeliveryReceiverDto {
  @IsNotEmpty()
  addressId: string;

  @IsNotEmpty()
  receiverName: string;

  @IsNotEmpty()
  document: string;

  @IsOptional()
  receiverPhone?: string;
}
