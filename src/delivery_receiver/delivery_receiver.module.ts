import { Module } from '@nestjs/common';
import { DeliveryReceiverService } from './delivery_receiver.service';
import { DeliveryReceiverController } from './delivery_receiver.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DeliveryReceivers } from './entities/delivery_receiver.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([DeliveryReceivers])],
  controllers: [DeliveryReceiverController],
  providers: [DeliveryReceiverService],
})
export class DeliveryReceiverModule {}
