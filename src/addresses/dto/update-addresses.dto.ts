import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressesDto } from './create-addresses.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAddressesDto extends PartialType(CreateAddressesDto) {
  @IsNotEmpty()
  @IsString()
  state_name: string;
}
