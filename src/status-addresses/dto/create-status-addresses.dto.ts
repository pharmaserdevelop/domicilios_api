import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStatusAddressesDto {
  @IsString()
  @IsNotEmpty()
  state: string;
}
