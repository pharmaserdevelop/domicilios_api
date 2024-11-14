import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressesDto } from './create-addresses.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAddressesDto extends PartialType(CreateAddressesDto) {
  @ApiProperty({
    description: 'The name of the state',
    example: 'California',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  state_name: string;
}
