import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStatusAddressesDto {
  @ApiProperty({
    description: 'The status of the address.',
    example: 'en preparacion',
  })
  @IsString()
  @IsNotEmpty()
  state: string;
}
