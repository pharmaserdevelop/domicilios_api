import { PartialType } from '@nestjs/swagger';
import { CreateUserOriginDto } from './create-user-origin.dto';

export class UpdateUserOriginDto extends PartialType(CreateUserOriginDto) {}
