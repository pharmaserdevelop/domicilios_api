import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateZoneDto {
  @ApiProperty({
    description: 'The name of the zone.',
    example: 'Downtown',
  })
  @IsString()
  @IsNotEmpty()
  nameZone: string;
}
