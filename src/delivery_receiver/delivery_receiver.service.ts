import { Injectable } from '@nestjs/common';
import { CreateDeliveryReceiverDto } from './dto/create-delivery_receiver.dto';
import { UpdateDeliveryReceiverDto } from './dto/update-delivery_receiver.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryReceivers } from './entities/delivery_receiver.entity';

@Injectable()
export class DeliveryReceiverService {
  constructor(
    @InjectRepository(DeliveryReceivers)
    private deliveryReceiversRepository: Repository<DeliveryReceivers>,
  ) {}

  async create(createDeliveryReceiverDto: CreateDeliveryReceiverDto) {
    const receiver = this.deliveryReceiversRepository.create(
      createDeliveryReceiverDto,
    );
    return await this.deliveryReceiversRepository.save(receiver);
  }

  findAll() {
    return `This action returns all deliveryReceiver`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deliveryReceiver`;
  }

  update(id: number, updateDeliveryReceiverDto: UpdateDeliveryReceiverDto) {
    return `This action updates a #${id} deliveryReceiver`;
  }

  remove(id: number) {
    return `This action removes a #${id} deliveryReceiver`;
  }
}
