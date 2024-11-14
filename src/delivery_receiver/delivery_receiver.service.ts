import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDeliveryReceiverDto } from './dto/create-delivery_receiver.dto';
import { UpdateDeliveryReceiverDto } from './dto/update-delivery_receiver.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryReceivers } from './entities/delivery_receiver.entity';
import { AddressessService } from '../addresses/addresses.service';

@Injectable()
export class DeliveryReceiverService {
  constructor(
    @InjectRepository(DeliveryReceivers)
    private readonly deliveryReceiversRepository: Repository<DeliveryReceivers>,
    private readonly addressesService: AddressessService,
  ) {}

  async create(createDeliveryReceiverDto: CreateDeliveryReceiverDto) {
    const { addressId } = createDeliveryReceiverDto;

    const addresses = await this.addressesService.findOne(addressId);
    if (!addresses) {
      throw new InternalServerErrorException('Address not found');
    }

    const receiver = this.deliveryReceiversRepository.create({
      address: addresses,
      ...createDeliveryReceiverDto,
    });
    return await this.deliveryReceiversRepository.save(receiver);
  }

  findAll() {
    return this.deliveryReceiversRepository.find({ relations: ['address'] });
  }

  findOne(id: string) {
    const deliveryReceiver = this.deliveryReceiversRepository.findOne({
      where: { id },
      relations: ['address'],
    });

    return deliveryReceiver;
  }

  update(id: number, updateDeliveryReceiverDto: UpdateDeliveryReceiverDto) {
    return `This action updates a #${id} deliveryReceiver`;
  }

  remove(id: number) {
    return `This action removes a #${id} deliveryReceiver`;
  }
}
