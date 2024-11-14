import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'The password of the user. It must contain at least one uppercase letter, one lowercase letter, one number, and be between 6 to 50 characters long.',
    example: 'Password123!',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have an uppercase letter, a lowercase letter, and a number',
  })
  password: string;

  @ApiProperty({
    description: 'The full name of the user.',
    example: 'John Doe',
  })
  @IsString()
  @MinLength(1)
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  document: string;

  @ApiProperty({
    description: 'An optional array of roles assigned to the user.',
    example: ['admin', 'domiciliario'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  roles?: string[];
}
