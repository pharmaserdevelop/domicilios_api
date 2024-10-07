import { IsString, IsNotEmpty } from 'class-validator';

export class CreateStatusDebtDto {
  @IsString()
  @IsNotEmpty()
  state_debt: string;
}
