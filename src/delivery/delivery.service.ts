import { Injectable } from '@nestjs/common';
import { CreateDeliverytoDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Injectable()
export class RepartoService {
  create(createDeliverytoDto: CreateDeliverytoDto) {
    return 'This action adds a new reparto';
  }

  findAll() {
    return `This action returns all reparto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reparto`;
  }

  update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    return `This action updates a #${id} reparto`;
  }

  remove(id: number) {
    return `This action removes a #${id} reparto`;
  }
}
