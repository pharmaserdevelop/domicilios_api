import { Module } from '@nestjs/common';
import { RequestsService } from './request.service';
import { RequestsController } from './request.controller';
import { AddressessModule } from '../addresses/addresses.module';
import { FilesModule } from '../files/files.module';
import { DebtsModule } from 'src/debts/debts.module';
import { PaymentSupportModule } from 'src/payment-support/payment-support.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Debt } from 'src/debts/entities/debt.entity';
import { PaymentSupport } from 'src/payment-support/entities/payment-support.entity';

@Module({
  controllers: [RequestsController],
  providers: [RequestsService],
  exports: [RequestsService],
  imports: [
    TypeOrmModule.forFeature([PaymentSupport, Debt]),
    AddressessModule,
    FilesModule,
    DebtsModule,
    PaymentSupportModule,
  ],
})
export class RequestModule {}
