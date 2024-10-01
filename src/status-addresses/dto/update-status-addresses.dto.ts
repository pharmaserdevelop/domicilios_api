import { PartialType } from '@nestjs/mapped-types';
import { CreateStatusAddressesDto } from './create-status-addresses.dto';

export class UpdateStatusAddressesDto extends PartialType(
  CreateStatusAddressesDto,
) {}
