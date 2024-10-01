import { PartialType } from '@nestjs/mapped-types';
import { CreateZoneDto } from './create-zone.dto';

export class UpdateZonaDto extends PartialType(CreateZoneDto) {}
