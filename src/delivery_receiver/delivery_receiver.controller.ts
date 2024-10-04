import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DeliveryReceiverService } from './delivery_receiver.service';
import { CreateDeliveryReceiverDto } from './dto/create-delivery_receiver.dto';
import { UpdateDeliveryReceiverDto } from './dto/update-delivery_receiver.dto';
import { DeliveryReceivers } from './entities/delivery_receiver.entity';

@Controller('delivery-receiver')
export class DeliveryReceiverController {
  constructor(
    private readonly deliveryReceiverService: DeliveryReceiverService,
  ) {}

  @Post()
  async create(
    @Body() createReceiverDto: CreateDeliveryReceiverDto,
  ): Promise<DeliveryReceivers> {
    return this.deliveryReceiverService.create(createReceiverDto);
  }

  @Get()
  findAll() {
    return this.deliveryReceiverService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveryReceiverService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeliveryReceiverDto: UpdateDeliveryReceiverDto,
  ) {
    return this.deliveryReceiverService.update(+id, updateDeliveryReceiverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryReceiverService.remove(+id);
  }
}
