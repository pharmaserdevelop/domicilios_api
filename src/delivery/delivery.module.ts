import { Module } from '@nestjs/common';
import { RepartoService } from './delivery.service';
import { RepartoController } from './deliveryto.controller';

@Module({
  controllers: [RepartoController],
  providers: [RepartoService],
})
export class RepartoModule {}
