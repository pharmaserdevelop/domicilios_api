import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { StateHistory } from './entities/state_history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Addresses } from 'src/addresses/entities/addresse.entity';
import { CreateStateHistoryDto } from './dto/create-state_history.dto';

@Injectable()
export class StateHistoryService {
  constructor(
    @InjectRepository(StateHistory)
    private readonly stateHistoryRepository: Repository<StateHistory>,
    @InjectRepository(Addresses)
    private readonly addressesRepository: Repository<Addresses>,
  ) {}

  async findAll(): Promise<StateHistory[]> {
    return await this.stateHistoryRepository.find({
      relations: ['addresses', 'state'],
      order: {
        date: 'DESC',
      },
    });
  }

  async getStateHistoriesByAddressId(
    addressId: string,
  ): Promise<StateHistory[]> {
    const address = await this.addressesRepository.find({
      where: { id: addressId },
    });

    if (!address) {
      throw new NotFoundException(`Address with ID ${addressId} not found`);
    }

    return await this.stateHistoryRepository.find({
      where: { addresses: { id: addressId } },
      relations: ['addresses', 'state'],
      order: {
        date: 'DESC',
      },
    });
  }

  async createStateHistoryAddresses(
    createStateHistoryDto: CreateStateHistoryDto,
  ): Promise<StateHistory> {
    try {
      const { addressesId, stateId } = createStateHistoryDto;

      const historyState = this.stateHistoryRepository.create({
        addresses: { id: addressesId },
        state: { id: stateId },
      });

      return await this.stateHistoryRepository.save(historyState);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al creating  history of state',
        error,
      );
    }
  }
}
