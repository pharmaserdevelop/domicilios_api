import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateStatusDebtDto {
  @ApiProperty({
    description: 'The status of the debt.',
    example: 'saladad',
  })
  @IsString()
  @IsNotEmpty()
  state_debt: string;
}
