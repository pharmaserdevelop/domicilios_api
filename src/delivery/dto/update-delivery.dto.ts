import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliverytoDto } from './create-delivery.dto';

export class UpdateDeliveryDto extends PartialType(CreateDeliverytoDto) {}
