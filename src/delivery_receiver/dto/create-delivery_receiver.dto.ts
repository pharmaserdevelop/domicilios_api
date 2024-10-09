import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeliveryReceiverDto {
  @ApiProperty({
    description: 'The ID of the address where the delivery will be made.',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  addressId: string;

  @ApiProperty({
    description: 'The name of the receiver for the delivery.',
    example: 'John Doe',
  })
  @IsNotEmpty()
  receiverName: string;

  @ApiProperty({
    description: 'The document number of the receiver (CC).',
    example: 'A12345678',
  })
  @IsNotEmpty()
  document: string;

  @ApiProperty({
    description: 'The phone number of the receiver (optional).',
    example: '+1234567890',
    required: false,
  })
  @IsOptional()
  receiverPhone?: string;
}
