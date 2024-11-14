import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveryReceiverDto } from './create-delivery_receiver.dto';

export class UpdateDeliveryReceiverDto extends PartialType(CreateDeliveryReceiverDto) {}
