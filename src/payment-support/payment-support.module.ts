import { Module } from '@nestjs/common';
import { PaymentSupportService } from './payment-support.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentSupport } from './entities/payment-support.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentSupport])],
  controllers: [],
  providers: [PaymentSupportService],
  exports: [PaymentSupportService],
})
export class PaymentSupportModule {}
