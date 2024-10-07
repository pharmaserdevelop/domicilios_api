import { IsDate, IsInt, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateDebtDto {
  @IsDate()
  date?: Date; // Puede ser opcional si se establece por defecto en el servicio

  @IsInt()
  @IsNotEmpty()
  amount: number;

  @IsUUID()
  deliveryPersonId: string;

  @IsUUID()
  addressId: string;

  @IsUUID()
  state_debt?: string = 'pendiente';
}
