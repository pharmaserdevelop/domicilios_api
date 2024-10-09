import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAddressesDto {
  @ApiProperty({
    description: 'The ID of the user associated with the address',
    example: 'user-123',
  })
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @ApiProperty({
    description: 'The ID of the origin associated with the address',
    example: 'origin-456',
  })
  @IsNotEmpty()
  @IsString()
  origin_id: string;

  @ApiProperty({
    description: 'The name of the state (optional)',
    example: 'California',
    required: false,
  })
  @IsOptional()
  @IsString()
  state_name?: string;

  @ApiProperty({
    description: 'Indicates if there is a mutual agreement',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  mutual_agreement?: boolean;

  @ApiProperty({
    description: 'The ID of the zone associated with the address',
    example: 'zone-789',
  })
  @IsNotEmpty()
  @IsString()
  zone_id: string;

  @ApiProperty({
    description: 'URL of an image related to the address (optional)',
    example: 'http://example.com/image.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  image_url?: string;

  @ApiProperty({
    description:
      'URL of an image of Signature related to the address (optional)',
    example: 'signature-string',
    required: false,
  })
  @IsOptional()
  @IsString()
  signature?: string;

  @ApiProperty({
    description: 'Document ID of the affiliate (optional)',
    example: '100834323',
    required: false,
    default: '0',
  })
  @IsOptional()
  @IsString()
  affiliateDocument?: string = '0';

  @ApiProperty({
    description: 'Name of the affiliate (optional)',
    example: 'John Doe',
    required: false,
    default: '0',
  })
  @IsOptional()
  @IsString()
  affiliateName?: string = '0';

  @ApiProperty({
    description: 'Phone number of the affiliate (optional)',
    example: '+1234567890',
    required: false,
    default: '0',
  })
  @IsOptional()
  @IsString()
  affiliatePhone?: string = '0';

  @ApiProperty({
    description: 'The actual address as a string',
    example: '123 Main St, Springfield, USA',
  })
  @IsNotEmpty()
  addresses: string;

  @ApiProperty({
    description: 'Indicates if the state is finished (optional)',
    example: false,
    required: false,
  })
  @IsBoolean()
  finished_state?: boolean;

  @ApiProperty({
    description: 'The ID of the delivery person assigned to this address',
    example: 'delivery-person-001',
  })
  @IsNotEmpty()
  @IsString()
  delivery_person_id: string;

  @ApiProperty({
    description: 'The value associated with this address entry',
    example: 100.5,
  })
  @IsNotEmpty()
  @IsNumber()
  value: number;
}
