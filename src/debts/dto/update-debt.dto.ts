import { PartialType } from '@nestjs/mapped-types';
import { CreateDebtDto } from './create-debt.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDebtDto extends PartialType(CreateDebtDto) {
  @ApiProperty({
    description: 'The state of the debt (optional). Defaults to "pendiente".',
    example: 'pendiente',
    required: false,
    default: 'pendiente',
  })
  @IsOptional()
  @IsString()
  state_debt?: string = 'pendiente';
}
