import { IsNotEmpty, IsString } from 'class-validator';

export class CreateZoneDto {
  @IsString()
  @IsNotEmpty()
  nameZone: string;
}
