import { IsString, IsNumber, IsDate, IsBoolean } from 'class-validator';

export class AddressDto {
  @IsString()
  id: string;

  @IsString()
  origin: string;

  @IsBoolean()
  mutualAgreement: boolean;

  @IsNumber()
  value?: number;

  @IsDate()
  date: Date;

  @IsString()
  imageUrl: string;

  @IsString()
  signature: string;

  @IsBoolean()
  finishedState: boolean;
}

export class DebtResponseDto {
  @IsString()
  id: string;

  @IsDate()
  date: Date;

  @IsNumber()
  amount: number;

  address: AddressDto;
}
