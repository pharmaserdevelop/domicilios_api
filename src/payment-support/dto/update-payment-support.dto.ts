import { PartialType } from '@nestjs/swagger';
import { CreatePaymentSupportDto } from './create-payment-support.dto';

export class UpdatePaymentSupportDto extends PartialType(CreatePaymentSupportDto) {}
