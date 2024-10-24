import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentSupportService } from './payment-support.service';
import { CreatePaymentSupportDto } from './dto/create-payment-support.dto';
import { UpdatePaymentSupportDto } from './dto/update-payment-support.dto';

@Controller('payment-support')
export class PaymentSupportController {
  constructor(private readonly paymentSupportService: PaymentSupportService) {}

  @Post()
  create(@Body() createPaymentSupportDto: CreatePaymentSupportDto) {
    return this.paymentSupportService.create(createPaymentSupportDto);
  }

  @Get()
  findAll() {
    return this.paymentSupportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentSupportService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentSupportDto: UpdatePaymentSupportDto) {
    return this.paymentSupportService.update(+id, updatePaymentSupportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentSupportService.remove(+id);
  }
}
