import { forwardRef, Module } from '@nestjs/common';
import { DeliveryReceiverService } from './delivery_receiver.service';
import { DeliveryReceiverController } from './delivery_receiver.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DeliveryReceivers } from './entities/delivery_receiver.entity';
import { AddressessModule } from 'src/addresses/addresses.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([DeliveryReceivers]),
    forwardRef(() => AddressessModule),
  ],
  controllers: [DeliveryReceiverController],
  providers: [DeliveryReceiverService],
  exports: [DeliveryReceiverService, TypeOrmModule],
})
export class DeliveryReceiverModule {}
