import { Module } from '@nestjs/common';
import { PaymentSupportService } from './payment-support.service';
import { PaymentSupportController } from './payment-support.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentSupport } from './entities/payment-support.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentSupport])],
  controllers: [PaymentSupportController],
  providers: [PaymentSupportService],
  exports: [PaymentSupportService],
})
export class PaymentSupportModule {}
