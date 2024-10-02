import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAddressesDto {
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  origin: string;

  @IsNotEmpty()
  @IsString()
  state_name: string;

  @IsBoolean()
  mutual_agreement: boolean;

  @IsNotEmpty()
  @IsString()
  zone_id: string;

  @IsOptional()
  @IsString()
  image_url?: string;

  @IsOptional()
  @IsString()
  signature?: string;

  @IsBoolean()
  finished_state?: boolean;

  @IsOptional()
  @IsString()
  delivery_person_id?: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;
}
