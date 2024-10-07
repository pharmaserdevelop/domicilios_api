import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStateHistoryDebtDto {
  @IsNotEmpty()
  @IsString()
  debtId: string;

  @IsNotEmpty()
  @IsString()
  stateDebt: string;
}
