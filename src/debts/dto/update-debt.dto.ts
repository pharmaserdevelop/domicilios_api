import { PartialType } from '@nestjs/mapped-types';
import { CreateDebtDto } from './create-debt.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDebtDto extends PartialType(CreateDebtDto) {
  @IsOptional()
  @IsString()
  state_debt?: string = 'pendiente';
}
