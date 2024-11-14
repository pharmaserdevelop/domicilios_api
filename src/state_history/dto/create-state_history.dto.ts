import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStateHistoryDto {
  @ApiProperty({
    description:
      'The UUID of the address associated with this state history entry.',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  addressesId: string;

  @ApiProperty({
    description: 'The UUID of the state associated with this history entry.',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsNotEmpty()
  @IsUUID()
  stateId: string;
}
