import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOriginDto {
  @ApiProperty({
    description: 'The name of the origin',
    example: 'origin-456',
  })
  @IsNotEmpty()
  @IsString()
  origin: string;
}
