import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStateHistoryDebtDto {
  @ApiProperty({
    description: 'The ID of the debt associated with this state history entry.',
    example: 'debt-12345',
  })
  @IsNotEmpty()
  @IsString()
  debtId: string;

  @ApiProperty({
    description: 'The state of the debt associated with this history entry.',
    example: 'pending',
  })
  @IsNotEmpty()
  @IsString()
  stateDebt: string;
}
