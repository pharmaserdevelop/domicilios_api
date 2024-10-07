import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Column } from 'typeorm';

export class CreateAddressesDto {
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  origin: string;

  @IsOptional()
  @IsString()
  state_name?: string;

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

  @IsOptional()
  @IsString()
  affiliateDocument?: string = '0';

  @IsOptional()
  @IsString()
  affiliateName?: string = '0';

  @IsOptional()
  @IsString()
  affiliatePhone?: string = '0';

  @Column()
  @IsNotEmpty()
  addresses: string;

  @IsBoolean()
  finished_state?: boolean;

  @IsNotEmpty()
  @IsString()
  delivery_person_id: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;
}
