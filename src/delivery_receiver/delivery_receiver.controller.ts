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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('delivery-receiver')
@Controller('delivery-receiver')
export class DeliveryReceiverController {
  constructor(
    private readonly deliveryReceiverService: DeliveryReceiverService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new delivery receiver' })
  @ApiResponse({
    status: 201,
    description: 'The delivery receiver has been successfully created.',
    type: DeliveryReceivers,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid delivery receiver data.',
  })
  async create(
    @Body() createReceiverDto: CreateDeliveryReceiverDto,
  ): Promise<DeliveryReceivers> {
    return this.deliveryReceiverService.create(createReceiverDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all delivery receivers' })
  @ApiResponse({
    status: 200,
    description: 'List of all delivery receivers.',
    type: [DeliveryReceivers],
  })
  findAll() {
    return this.deliveryReceiverService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a delivery receiver by ID' })
  @ApiResponse({
    status: 200,
    description: 'The found delivery receiver.',
    type: DeliveryReceivers,
  })
  @ApiResponse({ status: 404, description: 'Delivery receiver not found.' })
  findOne(@Param('id') id: string) {
    return this.deliveryReceiverService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a delivery receiver by ID' })
  @ApiResponse({
    status: 200,
    description: 'The delivery receiver has been successfully updated.',
    type: DeliveryReceivers,
  })
  @ApiResponse({ status: 404, description: 'Delivery receiver not found.' })
  update(
    @Param('id') id: string,
    @Body() updateDeliveryReceiverDto: UpdateDeliveryReceiverDto,
  ) {
    return this.deliveryReceiverService.update(+id, updateDeliveryReceiverDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a delivery receiver by ID' })
  @ApiResponse({
    status: 204,
    description: 'The delivery receiver has been successfully removed.',
  })
  @ApiResponse({ status: 404, description: 'Delivery receiver not found.' })
  remove(@Param('id') id: string) {
    return this.deliveryReceiverService.remove(+id);
  }
}
