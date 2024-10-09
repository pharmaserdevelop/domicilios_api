import { IsDate, IsInt, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDebtDto {
  @ApiProperty({
    description: 'The date of the debt (optional)',
    example: '2024-10-09T00:00:00Z',
    required: false,
  })
  @IsDate()
  date?: Date;

  @ApiProperty({
    description: 'The amount of the debt. Must be a positive integer.',
    example: 1500,
  })
  @IsInt()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    description: 'The UUID of the delivery person associated with this debt',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  deliveryPersonId: string;

  @ApiProperty({
    description: 'The UUID of the address associated with this debt',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsUUID()
  addressId: string;

  @ApiProperty({
    description: 'The state of the debt (optional). Defaults to "pendiente".',
    example: 'pendiente',
    required: false,
    default: 'pendiente',
  })
  @IsUUID()
  state_debt?: string = 'pendiente';
}
