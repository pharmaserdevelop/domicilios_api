import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateStateHistoryDto {
  @IsNotEmpty()
  @IsUUID()
  addressesId: string;

  @IsNotEmpty()
  @IsUUID()
  stateId: string;
}
