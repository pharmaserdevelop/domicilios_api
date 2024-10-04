import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDeliveryReceiverDto {
  @IsNotEmpty()
  addressId: string;

  @IsNotEmpty()
  receiverName: string;

  @IsOptional()
  receiverPhone?: string;
}
