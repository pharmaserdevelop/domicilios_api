import { Injectable } from '@nestjs/common';
import { CreatePaymentSupportDto } from './dto/create-payment-support.dto';
import { UpdatePaymentSupportDto } from './dto/update-payment-support.dto';

@Injectable()
export class PaymentSupportService {
  create(createPaymentSupportDto: CreatePaymentSupportDto) {
    return 'This action adds a new paymentSupport';
  }

  findAll() {
    return `This action returns all paymentSupport`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentSupport`;
  }

  update(id: number, updatePaymentSupportDto: UpdatePaymentSupportDto) {
    return `This action updates a #${id} paymentSupport`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentSupport`;
  }
}
